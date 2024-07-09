import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseAuth implements IUserAuthProvider {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient();
  }

  async sendOtpToEmail(email: string): Promise<Error | null> {
    const response = await this.client.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    return response?.error;
  }

  async verifyOtp(email: string, otp: string): Promise<Error | null> {
    const response = await this.client.auth.verifyOtp({ email, token: otp, type: "email" });

    return response?.error;
  }

  async validateUserAuth(): Promise<boolean> {
    const {
      data: { user },
    } = await this.client.auth.getUser();

    return !!user;
  }

  async getUserId(): Promise<string | undefined> {
    const {
      data: { user },
    } = await this.client.auth.getUser();

    return user?.id;
  }
}
