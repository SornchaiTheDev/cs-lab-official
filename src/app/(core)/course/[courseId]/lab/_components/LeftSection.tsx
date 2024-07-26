"use client";

import { NotebookText, History, CircleCheck } from "lucide-react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface Props {
  description: MDXRemoteSerializeResult;
}
function LeftSection({ description }: Props) {
  return (
    <div className="w-[500px] border border-gray-6 rounded-lg h-full bg-gray-1">
      <Tabs
        defaultValue="desc"
        className="h-full flex flex-col justify-start items-start"
      >
        <div className="p-4">
          <TabsList>
            <TabsTrigger value="desc" className="flex gap-2 items-center">
              <NotebookText size="1.25rem" />
              Description
            </TabsTrigger>
            <TabsTrigger value="subm">
              <History size="1.25rem" />
              Submissions
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="desc" className="px-4 py-2 overflow-y-auto">
          <h3 className="text-xl font-semibold">
            Find a, b in which a*b=n and (a+b) is the lowest
          </h3>
          <div className="flex items-center gap-2 text-grass-9 w-fit rounded-full my-4">
            <CircleCheck size="1.5rem" />
            <h5 className="text-sm font-semibold">Passed</h5>
          </div>

          <div className="prose prose-code:before:content-none prose-code:after:content-none font-anuphan">
            <MDXRemote {...description} />
          </div>
        </TabsContent>
        <TabsContent value="subm">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default LeftSection;

/*
      <Tabs
        variant="default"
        defaultValue="description"
        className="bg-grass-10 h-full"
      >
          <Tabs.Panel value="description" className="p-4">
            <h3 className="text-xl font-semibold">
              Find a, b in which a*b=n and (a+b) is the lowest
            </h3>
            <div className="flex items-center gap-2 text-grass-9 w-fit rounded-full mt-4">
              <CircleCheck size="1.5rem" />
              <h5 className="text-sm font-semibold">Passed</h5>
            </div>

            <div className="prose prose-code:before:content-none prose-code:after:content-none font-anuphan">
              <MDXRemote {...description} />
            </div>
          </Tabs.Panel>
	  </Tabs>
	    */
