import { parse } from "csv-parse/sync";

export const parseCSV = (content: string) => {
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    cast: (value, context) => {
      if (context.column === "roles") {
        return value.split("+");
      }
      return value;
    },
  });
  return records;
};
