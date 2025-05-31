import { ExternalLink, Import } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/commons/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/commons/Dialog";
import type { CreateUser } from "~/types/user";
import ImportMethod from "./ImportMethod";
import DataPreview from "./DataPreview";
import { parseCSV } from "./parse-csv";

function ImportUser() {
  const [step, setStep] = useState<"create" | "preview">("create");
  const [users, setUsers] = useState<CreateUser[]>([]);

  const router = useRouter();

  const goToDocs = () => router.push("#");

  const dialogTitle = {
    create: "Import Users",
    preview: "Preview Users",
  }[step];

  const dialogDescription = {
    create: "Upload a CSV file or write CSV content directly in the editor.",
    preview: "Preview the users you are about to import.",
  }[step];

  const handleDeleteUsers = (usernames: string[]) => {
    setUsers((prev) =>
      prev.filter((user) => !usernames.includes(user.username)),
    );
  };

  const handleOnImport = (content: string) => {
    const parsedUsers = parseCSV(content);
    setUsers(parsedUsers);
    setStep("preview");
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Import size="1rem" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px] max-w-fit p-4">
        <DialogHeader className="flex-row justify-between">
          <div className="space-y-2">
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </div>
          <Button onClick={goToDocs} className="h-fit shrink-0">
            <ExternalLink size="1rem" />
            Docs
          </Button>
        </DialogHeader>
        {step === "create" ? (
          <ImportMethod onImport={handleOnImport} />
        ) : (
          <DataPreview
            {...{ users }}
            onDeleteUsers={handleDeleteUsers}
            onClose={() => setIsOpen(false)}
            onBack={() => setStep("create")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ImportUser;
