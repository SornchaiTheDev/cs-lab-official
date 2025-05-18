import { Import } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/commons/Button";
import { FileUploader } from "~/components/commons/FileUploader";
import CodeMirror from "~/components/Editor/CodeMirror";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

function ImportUser() {
  const [currentTab, setCurrentTab] = useState<"file"| "editor">("file");
  const [csvContent, setCsvContent] = useState("");

  const handleUpload = () => {
    setCurrentTab("editor");
    setCsvContent("");
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Import size="1rem" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import User</DialogTitle>
          <DialogDescription>
            Upload a CSV file or write CSV content directly in the editor.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="file"
          value={currentTab}
          onValueChange={handleUpload}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
          </TabsList>
          <TabsContent value="file" className="mt-4">
            <FileUploader
              className="min-h-[300px] border rounded-md"
              onFileSelect={async (files) => {
                const file = files[0];
                if (file) {
                  const content = await file.text();
                  setCsvContent(content);
                }
              }}
              accept={{
                "text/csv": [".csv"],
              }}
              maxSize={10485760} // 10MB
            />
          </TabsContent>
          <TabsContent value="editor" className="mt-4">
            <div className="min-h-[300px] border border-gray-4 rounded-lg overflow-hidden">
              <CodeMirror
                value={csvContent}
                onChange={(value) => setCsvContent(value)}
                height="300px"
                lang="csv"
                placeholder="Enter CSV content here..."
              />
            </div>
          </TabsContent>
        </Tabs>
        <Button>Import</Button>
      </DialogContent>
    </Dialog>
  );
}

export default ImportUser;
