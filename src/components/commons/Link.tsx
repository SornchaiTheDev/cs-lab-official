"use client";
import { nprogress } from "@mantine/nprogress";
import NextLink, { type LinkProps } from "next/link";
import { type ReactNode } from "react";
import { shouldTriggerStartEvent } from "~/lib/shouldTriggerStartEvent";

function Link(props: LinkProps & { children?: ReactNode; className?: string }) {
  return (
    <NextLink
      onClick={(e) =>
        shouldTriggerStartEvent(props.href.toString(), e) && nprogress.start()
      }
      {...props}
    />
  );
}

export default Link;
