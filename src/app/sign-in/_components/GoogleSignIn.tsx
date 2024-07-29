"use client"
import Image from "next/image";
import GoogleIcon from "~/assets/images/google-logo.png";

function GoogleSignIn() {
  return (
    <button
      onClick={() => {}}
      className="w-full mt-8 border border-gray-6 px-5 py-2.5 rounded-lg flex items-center justify-center gap-4  bg-gray-2 hover:bg-gray-4"
    >
      <Image src={GoogleIcon} width={28} height={28} alt="Google Icon" />
      <p>Sign in with Google</p>
    </button>
  );
}

export default GoogleSignIn;
