import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface Props {
  isLoading: boolean;
}

const LoadingData = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="w-6 h-6" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-24 h-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-24 h-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-24 h-8" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

function TestcaseTable({ isLoading }: Props) {
  return (
    <Table noScroll className="mt-2 overflow-visible">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Testcase</TableHead>
          <TableHead>Input</TableHead>
          <TableHead>Output</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{isLoading && <LoadingData />}</TableBody>
    </Table>
  );
}

export default TestcaseTable;