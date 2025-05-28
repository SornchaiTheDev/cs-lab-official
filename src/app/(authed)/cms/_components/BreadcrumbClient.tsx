"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import type { ClassNameProps } from "~/types/classname-props";

function BreadcrumbClient({ className }: ClassNameProps) {
  const pathname = usePathname();

  if (pathname.endsWith("/cms")) return null;

  const pathNames = {
    cms: "CMS",
    courses: "Courses",
    users: "Users Management",
  } as const;

  const paths = pathname
    .split("/")
    .filter((path) => path !== "") as (keyof typeof pathNames)[];

  return (
    <Breadcrumb {...{ className }}>
      <BreadcrumbList>
        {paths.map((path, index) => {
          let renderBreadcrumb = (
            <BreadcrumbItem key={path}>
              <BreadcrumbPage>{pathNames[path]}</BreadcrumbPage>
            </BreadcrumbItem>
          );

          if (path in pathNames && index !== paths.length - 1) {
            renderBreadcrumb = (
              <BreadcrumbItem key={path}>
                <BreadcrumbLink asChild>
                  <Link href={`/${path}`}>{pathNames[path]}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }

          return (
            <Fragment key={path}>
              {renderBreadcrumb}
              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbClient;
