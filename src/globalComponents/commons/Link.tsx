"use client";
import { useSetAtom } from "jotai";
import NextLink, { type LinkProps } from "next/link";
import { type ReactNode } from "react";
import { shouldTriggerStartEvent } from "~/lib/shouldTriggerStartEvent";
import { appAtom } from "~/globalStore/app";

function Link(props: LinkProps & { children?: ReactNode; className?: string }) {
  const setApp = useSetAtom(appAtom);
  return (
    <NextLink
      onClick={(e) => {
        shouldTriggerStartEvent(props.href.toString(), e) &&
          setApp((prev) => ({ ...prev, isNavigating: true }));
      }}
      {...props}
    />
  );
}

export default Link;
