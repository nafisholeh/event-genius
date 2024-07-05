import VerifyOtpUseCase from "@/core/auth/use-cases/VerifyOtpUseCase";
import { SupabaseAuth } from "@/providers/SupabaseAuth";

export default class VerifyOtpFactory extends VerifyOtpUseCase {
  constructor() {
    super(new SupabaseAuth());
  }
}
