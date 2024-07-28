import { CircleCheck } from "lucide-react";
import React from "react";
import type { IPassedCard } from "./types";
import {
  Card,
  CardContent,
  CardFooter,
  Order,
  Status,
  Testcase,
} from "./BaseCard";

export function PassedCard({ order, totalCase, onClick }: IPassedCard) {
  return (
    <Card onClick={onClick} className="border-grass-6">
      <CircleCheck className="text-grass-9" />
      <CardContent>
        <Order>{order}</Order>
        <CardFooter>
          <Status className="text-grass-11">Passed</Status>
          <Testcase correctCase={totalCase} {...{ totalCase }} />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
