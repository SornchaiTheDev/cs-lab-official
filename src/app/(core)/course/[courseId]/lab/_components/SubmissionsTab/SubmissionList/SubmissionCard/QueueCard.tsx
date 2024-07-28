import { RefreshCcw } from "lucide-react";
import React from "react";
import type { IBaseCard } from "./types";
import { Card, CardContent, CardFooter, Order, Status } from "./BaseCard";

export function QueueCard({ order, onClick }: IBaseCard) {
  return (
    <Card onClick={onClick}>
      <RefreshCcw className="text-gray-11" />
      <CardContent>
        <Order>{order}</Order>
        <CardFooter>
          <Status>In Queue</Status>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
