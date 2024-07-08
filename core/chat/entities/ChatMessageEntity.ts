export enum RoleType {
  USER = "USER",
  ASSISTANT = "ASSISTANT",
}

export type ChatMessageUIType = {
  id: string;
  createdAt: string;
  sessionId: number | null;
  content: string | null;
  role: string | undefined;
  userId: string | null;
};

export default class ChatMessageEntity {
  private _id: string;
  private _sessionId: number | null;
  private _userId: string | null;
  private _role: RoleType | "USER" | "ASSISTANT" | null;
  private _content: string | null;
  private _createdAt: Date;

  constructor(
    id: string,
    userId: string | null,
    role: RoleType | "USER" | "ASSISTANT" | null,
    content: string | null,
    createdAt: Date,
    sessionId: number | null,
  ) {
    this._id = id;
    this._sessionId = sessionId;
    this._userId = userId;
    this._role = role;
    this._content = content;
    this._createdAt = createdAt;
  }

  public get id(): string {
    return this._id;
  }

  public get sessionId(): number | null {
    return this._sessionId;
  }

  public set sessionId(value: number) {
    this._sessionId = value;
  }

  public get userId(): string | null {
    return this._userId;
  }

  public set userId(value: string) {
    this._userId = value;
  }

  public get role(): RoleType | "USER" | "ASSISTANT" | null {
    return this._role;
  }

  public set role(value: RoleType) {
    this._role = value;
  }

  public get content(): string | null {
    return this._content;
  }

  public set content(value: string) {
    this._content = value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public static fromDatabase(data: {
    id: string;
    created_at: Date;
    session_id: number | null;
    content: string | null;
    role: RoleType | "USER" | "ASSISTANT" | null;
    user_id: string | null;
  }): {
    id: string;
    createdAt: string;
    sessionId: number | null;
    content: string | null;
    role: string | undefined;
    userId: string | null;
  } {
    return new ChatMessageEntity(
      data.id,
      data.user_id,
      data.role,
      data.content,
      new Date(data.created_at),
      data.session_id,
    ).toUIFormat();
  }

  public toUIFormat() {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      sessionId: this.sessionId,
      content: this.content,
      role: this.role?.toLowerCase(),
      userId: this.userId,
    };
  }
}
