import { UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import CoreLayout, {
  CoreLayoutContent,
  CoreLayoutSidebar,
} from "~/layouts/CoreLayout";
import type { ChildrenProps } from "~/types/children-props";
import BreadcrumbClient from "./_components/BreadcrumbClient";
import { rolesAllowlistMiddleware } from "~/middlewares/roles-allowlist";

async function Layout({ children }: ChildrenProps) {
  await rolesAllowlistMiddleware(["admin", "instructor"]);

  return (
    <CoreLayout homePath="/cms">
      <CoreLayoutSidebar>
        <h6 className="text-gray-11 text-sm font-light py-2">CMS</h6>
        <div className="mt-2">
          <Link
            href="/cms/users"
            className="flex items-center gap-1.5 text-gray-10 p-2 hover:bg-gray-4 rounded-lg hover:text-gray-11 w-full"
          >
            <UserRound size="1rem" />
            <p className="text-sm">Users Management</p>
          </Link>
        </div>
      </CoreLayoutSidebar>
      <CoreLayoutContent className="p-4 min-h-0">
        <BreadcrumbClient />
        {children}
      </CoreLayoutContent>
    </CoreLayout>
  );
}

export default Layout;
