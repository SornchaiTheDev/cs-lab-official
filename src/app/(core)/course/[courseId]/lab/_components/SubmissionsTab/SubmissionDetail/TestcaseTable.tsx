import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

function TestcaseTable() {
  return (
    <Table className="mt-2">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Testcase</TableHead>
          <TableHead>Input</TableHead>
          <TableHead>Output</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 20 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell className="text-right">Correct</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TestcaseTable;
