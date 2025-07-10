import TableSection from "./_components/TableSection";

function UsersManagementPage() {
  return (
    <div className="flex-1 flex flex-col w-full max-w-[1920px] mx-auto">
      <h4 className="text-(--gray-12) text-2xl font-medium">
        Users Management
      </h4>
      <TableSection />
    </div>
  );
}

export default UsersManagementPage;
