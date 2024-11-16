"use client";

import Lottie, { type Options } from "react-lottie";

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
