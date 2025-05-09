import { AlertBody, AlertContainer, AlertHeader } from "./Alert";
import { MessageSquareWarning } from "lucide-react";

interface Props {
  message: React.ReactNode;
  className?: string;
}
function ErrorAlert({ message, className }: Props) {
  return (
    <AlertContainer {...{ className }}>
      <AlertHeader icon={<MessageSquareWarning />}>Error</AlertHeader>
      <AlertBody className="text-red-9">{message}</AlertBody>
    </AlertContainer>
  );
}

export default ErrorAlert;
