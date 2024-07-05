import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseAuth implements IUserAuthProvider {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient();
  }

  async sendOtpToEmail(email: string): Promise<void> {
    await this.client.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
  }

  async verifyOtp(email: string, otp: string): Promise<void> {
    await this.client.auth.verifyOtp({ email, token: otp, type: "email" });
  }
}
