import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ImportEditor from "./ImportEditor";
import { FileUploader } from "~/components/commons/FileUploader";

interface Props {
  onImport: (content: string) => void;
}

function ImportMethod({ onImport }: Props) {
  return (
    <Tabs defaultValue="file" className="mt-4">
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
              onImport(content);
            }
          }}
          accept={{
            "text/csv": [".csv"],
          }}
          maxSize={10485760} // 10MB
        />
      </TabsContent>
      <TabsContent value="editor" className="mt-4">
        <ImportEditor {...{ onImport }} />
      </TabsContent>
    </Tabs>
  );
}

export default ImportMethod;
