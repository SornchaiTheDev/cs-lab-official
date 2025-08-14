import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

function InfoPopover() {
  return (
    <Tooltip>
      <TooltipTrigger className="text-muted-foreground hover:text-foreground">
        <Info size="1rem" />
      </TooltipTrigger>
      <TooltipContent>
        <p>Credential: Non-KU users</p>
        <p>Oauth: KU Student users</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default InfoPopover;
