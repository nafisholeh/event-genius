# Event Genius: Your Smart AI Partner for Effortless Event Planning!

![event genius demo](https://github.com/user-attachments/assets/f2b23f64-77f0-4620-bc5c-5ce5ecc70421)

Event Genius is an AI assistant tailored to streamline all your event planning needs. Leveraging the power of [LangChain](https://www.langchain.com/) and [WithMartian](https://withmartian.com/), Event Genius offers a seamless and intelligent event management experience. This Next.js application is meticulously crafted to integrate various tools and libraries, providing a comprehensive solution for managing events efficiently. This project adopts a clean architecture approach to ensure maintainability and scalability, utilizing several modern web development technologies to deliver a robust and scalable application.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- Event management with rich features
- Integration with Supabase for backend services
- Utilizes Prisma for database management
- AI capabilities with LangChain and Martian
- Rich UI components with Geist and Tailwind CSS
- Data visualization with amCharts
- Markdown support with markdown-to-jsx
- Clean architecture for maintainability and scalability

## Architecture

This project follows the principles of clean architecture, separating the codebase into distinct layers with clear responsibilities. This ensures that the business logic is decoupled from the user interface and infrastructure, promoting testability and scalability.


![image](https://github.com/user-attachments/assets/0625c9ba-d66e-4774-a102-e5e8b2d85530)

### Project Structure

The project is organized into several main directories, each with a specific purpose:

- `core/`: Represents the application and domain layers.
  - `entities/`: Models of business entities. Entities can only be accessed by use cases, except for the types.
  - `entities/errors/`: Contains error definitions specific to the domain and business logic.
  - `providers/`: Interfaces defining connections to databases or APIs, serving as abstractions for external dependencies.
  - `use-cases/`: Core business logic. Each use case covers one action and is supplied with necessary classes instantiated in corresponding factory classes.
- `factory/`: Connects the core with providers and the framework/UI layer. The UI will only access the factory.
- `providers/`: Contains classes to be instantiated for external functionalities and database/API connections.

### AI Capabilities

Event Genius leverages AI capabilities using LangChain and Martian:

- LangChain: Provides advanced AI functionalities for various tasks within the application.
- Martian: Used to optimize and lower costs associated with AI operations.

### Directory Overview

```plaintext
chat
├── entities
│   ├── errors
│   │   └── NoUserDataError.ts
│   ├── ChatMessageEntity.ts
│   └── ChatSessionEntity.ts
├── providers
│   └── ICloudDBProvider.ts
├── use-cases
│   ├── RecordMessageUseCase.ts
│   ├── RetrieveChatUseCase.ts
│   ├── RetrieveSessionUseCase.ts
│   └── RetrieveUserPromptUseCase.ts
factory
├── RecordMessageFactory.ts
├── RetrieveChatFactory.ts
├── RetrieveSessionFactory.ts
├── RetrieveUserPromptFactory.ts
├── SendOtpToEmailFactory.ts
├── ValidateUserAuthFactory.ts
└── VerifyOtpFactory.ts
providers
├── db.ts
├── PostgresqlPrisma.ts
└── SupabaseAuth.ts
```

### Implementation Notes

- **Use Cases**: Each use case covers a single action and is supplied with necessary dependencies via corresponding factory classes.
- **Entities**: Business models that can only be accessed by use cases, except for their type definitions.
- **Providers**: Contains classes to be instantiated for external functionalities, such as database or API connections.
- **Factories**: Connects the core business logic with the providers and the framework/UI layer, ensuring that the UI only interacts with factory classes.
- **Database Transactions**: As Prisma can only be used inside the server, most transaction operations are handled by calling APIs that execute use cases via class-generated factories.

## Environment Variables

Ensure the following environment variables are set in your `.env.local` and `.env` files:

### `.env.local`

```
MARTIAN_API_KEY=your_martian_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### `.env`

```
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nafisholeh/event-genius.git
   ```

2. Navigate to the project directory:

   ```bash
   cd event-genius
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables as described in the [Environment Variables](#environment-variables) section.

## Usage

### Development

To start the development server:

```bash
npm run dev
```

### Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Linting

To lint the codebase:

```bash
npm run lint
```

### Formatting

To format the codebase with Prettier:

```bash
npm run format
```

## Scripts

- `dev`: Starts the development server using Next.js.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for linting errors.
- `format`: Formats the codebase using Prettier.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy using Event Genius! If you have any questions or feedback, feel free to reach out.
