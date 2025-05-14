import { Search } from "lucide-react";

interface SearchDataProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchData({ value, onChange }: SearchDataProps) {
  return (
    <div className="relative pl-7 border bg-gray-2 rounded-md w-64 h-full flex items-center hover:bg-gray-2">
      <Search
        size="1rem"
        className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-9"
      />
      <input
        placeholder="Search users"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block text-sm w-full h-fit outline-none bg-transparent"
      />
    </div>
  );
}

export default SearchData;
