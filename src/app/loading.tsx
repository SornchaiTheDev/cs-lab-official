"use client";

import Lottie from "react-lottie";
import loadingAniamtionData from "~/assets/lottie/loading.json";

function LoadingComponent() {
  const options = {
    loop: true,
    autoplay: true,
    animationData: loadingAniamtionData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie options={options} width={100} height={100} />
    </div>
  );
}

export default LoadingComponent;
