import CoreLayout, {
  CoreLayoutSidebar,
  CoreLayoutContent,
} from "~/layouts/CoreLayout";
import type { ChildrenProps } from "~/types/children-props";
import Sidebar from "./components/Menus/Sidebar";

function Layout({ children }: ChildrenProps) {
  return (
    <CoreLayout>
      <CoreLayoutSidebar>
        <Sidebar />
      </CoreLayoutSidebar>
      <CoreLayoutContent>{children}</CoreLayoutContent>
    </CoreLayout>
  );
}

export default Layout;
