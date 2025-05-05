"use client";
import Image from "next/image";
import { useState } from "react";
import GoogleIcon from "~/assets/images/google-logo.png";
import Loading from "~/components/commons/Loading";

function GoogleSignIn() {
  const handleOnSignIn = () => {
    setIsLoading(true);
    window.location.href = window.env.CLIENT_API_URL + "/auth/sign-in/google";
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      onClick={handleOnSignIn}
      className="w-full mt-8 border border-gray-6 px-5 py-2.5 rounded-lg flex items-center justify-center gap-4  bg-gray-2 hover:bg-gray-4"
    >
      <Image src={GoogleIcon} width={28} height={28} alt="Google Icon" />
      <Loading {...{ isLoading }}>
        <p>Sign in with Google</p>
      </Loading>
    </button>
  );
}

export default GoogleSignIn;
