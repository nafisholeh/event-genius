import { ValidateUserAuthUseCase } from "@/core/auth/use-cases/ValidateUserAuthUseCase";
import { SupabaseAuth } from "@/providers/SupabaseAuth";

export default class ValidateUserAuthFactory extends ValidateUserAuthUseCase {
  constructor() {
    super(new SupabaseAuth());
  }
}
