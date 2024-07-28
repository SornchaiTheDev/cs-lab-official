import { CircleX } from "lucide-react";
import React from "react";
import { IFailedCard } from "./types";
import {
  Card,
  CardContent,
  CardFooter,
  Order,
  Status,
  Testcase,
} from "./BaseCard";

export function FailedCard({
  order,
  correctCase,
  totalCase,
  onClick,
}: IFailedCard) {
  return (
    <Card onClick={onClick} className="border-tomato-6">
      <CircleX className="text-tomato-9" />
      <CardContent>
        <Order>{order}</Order>
        <CardFooter>
          <Status className="text-tomato-11">Passed</Status>
          <Testcase {...{ correctCase, totalCase }} />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
