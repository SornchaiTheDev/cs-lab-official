import UsernameAndPassword from "./_components/UsernameAndPassword";
import GoogleSignIn from "./_components/GoogleSignIn";
import QuotesSection from "./_components/QuotesSection";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In | CS Lab",
};

function SignInPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen p-6 bg-gray-2">
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full h-full max-w-[30rem] flex flex-col justify-center items-center">
          <h3 className="text-2xl lg:text-3xl font-semibold text-center">
            CS Lab
          </h3>
          <GoogleSignIn />

          <div className="flex gap-2 w-1/2 items-center mt-4">
            <div className="flex-1 border-t border-gray-6"></div>
            <p className="text-sm text-gray-8">or</p>
            <div className="flex-1 border-t border-gray-6"></div>
          </div>

          <UsernameAndPassword />
        </div>

        <p className="text-xs lg:text-sm">
          Made with ☕ for Kasetsart University{" "}
          <a
            className="text-grass-10 font-semibold"
            href="https://github.com/SornchaiTheDev"
            target="_blank"
          >
            @SornchaiTheDev
          </a>
        </p>
      </div>
      <QuotesSection />
    </div>
  );
}

export default SignInPage;
