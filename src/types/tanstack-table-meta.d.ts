export {};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    userPreview?: {
      deleteUser: (username: string) => void;
    };
    addUser?: {
      editUser: (id: string) => void;
      deleteUser: (id: string) => void;
    };
  }
}
