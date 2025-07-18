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
      <DialogContent className="min-w-[800px] sm:max-w-fit">
        <DialogHeader className="flex-row justify-between p-4 w-full">
          <div className="space-y-2 w-full">
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
            <a
              className="inline-flex items-center gap-1.5 hover:text-(--grass-9)"
              href="#"
            >
              <ExternalLink size="1rem" />
              Docs
            </a>
          </div>
        </DialogHeader>
        <div className="p-4 space-y-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImportUser;
