import LeftSection from "../_components/LeftSection";
import { serialize } from "next-mdx-remote/serialize";
import fs from "fs/promises";
import RightSection from "../_components/RightSection";
import { headers } from "next/headers";
import { isFromMobile } from "~/lib/isFromMobile";
import LottieComp from "~/components/commons/Lottie";
import floating from "~/assets/lotties/foating.json";

async function LabPage() {
  const lab1 = await fs.readFile(`${process.cwd()}/__mocks__/lab1.mdx`, "utf8");

  const mdxSource = await serialize(lab1);

  const userAgent = headers().get("User-Agent");

  if (userAgent !== null && isFromMobile(userAgent)) {
    return (
      <div className="fixed inset-0 h-screen flex flex-col justify-center items-center gap-12">
        <LottieComp animationData={floating} width={300} height={300} />
        <h2 className="text-center text-sm">
          Sorry but this page doesn&apos;t support on mobile devices.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex bg-gray-2">
      <LeftSection description={mdxSource} />
      <div className="flex items-center h-full mx-2">
        <button className="w-2 h-12 bg-gray-6 rounded-full hover:h-14 transition-all cursor-ew-resize"></button>
      </div>
      <RightSection />
    </div>
  );
}

export default LabPage;
