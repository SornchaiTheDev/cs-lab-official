"use client";

import loadingAniamtionData from "~/assets/lotties/loading.json";
import LottieComp from "~/components/commons/Lottie";

function LoadingComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LottieComp
        animationData={loadingAniamtionData}
        width={100}
        height={100}
      />
    </div>
  );
}

export default LoadingComponent;
