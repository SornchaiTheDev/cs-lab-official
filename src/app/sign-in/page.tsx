import UsernameAndPassword from "./_components/UsernameAndPassword";
import GoogleSignIn from "./_components/GoogleSignIn";
import QuotesSection from "./_components/QuotesSection";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : "Sign In | CS Lab"
}

function SignInPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <QuotesSection />
      <div className="flex-1 flex justify-center items-center bg-gray-1">
        <div className="flex flex-col items-center w-full px-4 max-w-[30rem]">
          <h3 className="text-2xl lg:text-3xl font-semibold">Sign In</h3>
          <GoogleSignIn />

          <div className="flex gap-2 w-1/2 items-center mt-4">
            <div className="flex-1 border-t border-gray-6"></div>
            <p>or</p>
            <div className="flex-1 border-t border-gray-6"></div>
          </div>

          <UsernameAndPassword />

          <div className="lg:absolute lg:bottom-4 mt-8 lg:mt-0 flex flex-col items-center gap-2 text-sm">
            {/*
            <ul className="flex gap-4 text-sm text-grass-10">
              <Link href="https://google.co.th" className="hover:text-grass-8">
                Term of use
              </Link>
              <Link href="https://google.co.th" className="hover:text-grass-8">
                Privacy Policy
              </Link>
            </ul>
            */}
            <p className="text-xs lg:text-sm">
              Made with ☕ for Kasetsart University{" "}
              <a
                className="text-grass-10 font-semibold"
                href="https://instagram.com/_cho_kun_"
                target="_blank"
              >
                @SornchaiTheDev
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
