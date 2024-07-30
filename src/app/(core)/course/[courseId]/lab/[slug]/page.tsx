import LeftSection from "../_components/LeftSection";
import RightSection from "../_components/RightSection";
import { headers } from "next/headers";
import { isFromMobile } from "~/lib/isFromMobile";
import LottieComp from "~/components/commons/Lottie";
import floating from "~/assets/lotties/foating.json";
import DescriptionTab from "../_components/DescriptionTab";
import { type Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { courseId: string; slug: string };
}): Promise<Metadata> => {
  // const { courseId, slug } = params;

  const labName = "Lab 1.1 Find a, b in which a*b=n and (a+b) is the lowest";
  const isNotFit = labName.length > 32;
  let title = labName.slice(0, 32);

  if (isNotFit) title += "...";

  return {
    title: `${title} | CS Lab`,
  };
};



async function LabPage({params} : {params : {slug : string}}) {
  const userAgent = headers().get("User-Agent");

  if (isFromMobile(userAgent)) {
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
    <div className="h-full flex flex-col bg-gray-2 p-2 gap-2">
      <div className="flex-1 flex min-h-0">
        <LeftSection descriptionTab={<DescriptionTab />} />
        <RightSection
          labSlug={params.slug}
          initialCode='print("Hello World")'
          allowLanguages={["Python3", "Go", "C", "C++", "Rust"]}
        />
      </div>
    </div>
  );
}

export default LabPage;
