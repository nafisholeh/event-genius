import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import SendOtpToEmailFactory from "@/factory/SendOtpToEmailFactory";
import VerifyOtpFactory from "@/factory/VerifyOtpFactory";

export default function Login({
  searchParams,
}: {
  searchParams: { email: string, emailSubmitted: string, message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;

    try {
      const sendOtpToEmailFactory = new SendOtpToEmailFactory();
      await sendOtpToEmailFactory.execute({ email });
    } catch (error) {
      return redirect(`/login?message=${(error as Error).message || "Could not authenticate user"}`);
    }

    return redirect(`/login?emailSubmitted=true&email=${email}&message=Check your email for the OTP`);
  };

  const verifyOtp = async (formData: FormData) => {
    "use server";

    const otp = formData.get("otp") as string;
    const email = formData.get("email") as string;

    try {
      const verifyOtpFactory = new VerifyOtpFactory();
      await verifyOtpFactory.execute({ email, otp });
    } catch (error) {
      return redirect(`/login?emailSubmitted=true&email=${email}&message=Invalid OTP`);
    }

    return redirect("/protected");
  };

  const emailSubmitted = searchParams?.emailSubmitted === "true";
  const email = searchParams?.email;

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      {!emailSubmitted ? (
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signIn} method="post">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-white mb-2"
            pendingText="Sending OTP..."
          >
            Send OTP
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      ) : (
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={verifyOtp} method="post">
          <label className="text-md" htmlFor="otp">
            Enter OTP
          </label>
          <input
            type="hidden"
            name="email"
            value={email}
          />
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="otp"
            placeholder="123456"
            required
          />
          <SubmitButton
            formAction={verifyOtp}
            className="bg-green-700 rounded-md px-4 py-2 text-white mb-2"
            pendingText="Verifying OTP..."
          >
            Verify OTP
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
