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

function BreadcrumbClient() {
  const pathname = usePathname();

  const pathNames = {
    cms: "CMS",
    users: "Users Management",
  } as const;

  const paths = pathname
    .split("/")
    .filter((path) => path !== "") as (keyof typeof pathNames)[];

  console.log(paths);

  return (
    <Breadcrumb>
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
