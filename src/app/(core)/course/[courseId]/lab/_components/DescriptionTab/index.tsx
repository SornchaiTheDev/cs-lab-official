import { CircleCheck } from "lucide-react";
import React from "react";
import fs from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import MDXClient from "./MDXClient";

async function DescriptionTab() {
  const lab1 = await fs.readFile(`${process.cwd()}/__mocks__/lab1.mdx`, "utf8");

  const mdxSource = await serialize(lab1);

  return (
    <>
      <h3 className="text-xl font-semibold">
        Find a, b in which a*b=n and (a+b) is the lowest
      </h3>
      <div className="flex items-center gap-2 text-grass-9 w-fit rounded-full my-4">
        <CircleCheck size="1.5rem" />
        <h5 className="text-sm font-semibold">Passed</h5>
      </div>

      <div className="prose prose-code:before:content-none prose-code:after:content-none font-anuphan">
        <MDXClient source={mdxSource} />
      </div>
    </>
  );
}

export default DescriptionTab;
