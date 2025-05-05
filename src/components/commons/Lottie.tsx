"use client";

import dynamic from "next/dynamic";
import { type Options } from "react-lottie";
const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

interface Props {
  animationData: any;
  width?: string | number;
  height?: string | number;
}

function LottieComp({ animationData, width, height }: Props) {
  const options: Options = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie {...{ width, height, options }} />;
}

export default LottieComp;
