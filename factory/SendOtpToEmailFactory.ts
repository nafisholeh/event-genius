import { SendOtpToEmailUseCase } from "@/core/auth/use-cases/SendOtpToEmailUseCase";
import { SupabaseAuth } from "@/providers/SupabaseAuth";

export default class SendOtpToEmailFactory extends SendOtpToEmailUseCase {
  constructor() {
    super(new SupabaseAuth());
  }
}
