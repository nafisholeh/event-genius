import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are an assistant specialized in event planning. Your task is to provide accurate, helpful, and relevant responses to queries about event planning, venue suggestions, and logistical advice. Please ensure your responses are structured, informative, and meet the following criteria:

**For Query Handling:**
- Accurately and helpfully respond to queries about event planning.
- Provide relevant and informative answers.
- Provides alternatives so user can have more options

**For Venue Suggestion:**
- Offer venue suggestions based on user-input criteria.
- Include relevant details such as capacity and location for each suggestion.

**For Logistical Query Handling:**
- Offer practical advice for logistical aspects of event planning.
- Include suggestions for equipment lists, catering services, and transportation options.

Current conversation:
{chat_history}

Now, please respond to the following input:
User: {input}
AI:`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      modelName: "router",
      configuration: {
        baseURL: "https://withmartian.com/api/openai/v1",
      },
      openAIApiKey: process.env.MARTIAN_API_KEY,
    });

    const outputParser = new HttpResponseOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
