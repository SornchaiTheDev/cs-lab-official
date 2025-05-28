"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/commons/Button";

function CreateCourseButton() {
  const router = useRouter();
  const handleOnCreateCourse = () => router.push("/cms/courses/create");

  return (
    <Button onClick={handleOnCreateCourse} className="my-4">
      <Plus size="1rem" />
      New course
    </Button>
  );
}

export default CreateCourseButton;
