import LeftSection from "../_components/LeftSection";
import RightSection from "../_components/RightSection";
import { headers } from "next/headers";
import { isFromMobile } from "~/lib/isFromMobile";
import LottieComp from "~/components/commons/Lottie";
import floating from "~/assets/lotties/foating.json";
import DescriptionTab from "../_components/DescriptionTab";
import { type Metadata } from "next";
import { languages } from "../__mocks__/languages";
import { initialsCodes } from "../__mocks__/initialCodes";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ courseId: string; problemId: string }>;
}): Promise<Metadata> => {
  // const { courseId, problemId } = params;

  const labName = "Lab 1.1 Find a, b in which a*b=n and (a+b) is the lowest";
  const isNotFit = labName.length > 32;
  let title = labName.slice(0, 32);

  if (isNotFit) title += "...";

  return {
    title: `${title} | CS Lab`,
  };
};

async function LabPage(props: { params: Promise<{ problemId: string }> }) {
  const params = await props.params;
  const userAgent = (await headers()).get("User-Agent");

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
    <div className="h-full flex flex-col bg-(--gray-2) gap-2">
      <div className="flex-1 flex min-h-0">
        <LeftSection descriptionTab={<DescriptionTab />} />
        <RightSection
          problemId={params.problemId}
          initialCodes={initialsCodes}
          allowLanguages={languages}
        />
      </div>
    </div>
  );
}

export default LabPage;
