"use client";

import { Trash } from "lucide-react";
import { Button } from "~/components/commons/Button";
interface Props {
  onClick?: () => void;
}

function DeleteManyButton({ onClick }: Props) {
  return (
    <Button {...{ onClick }} variant="danger">
      <Trash size="1rem" />
      Delete
    </Button>
  );
}

export default DeleteManyButton;
