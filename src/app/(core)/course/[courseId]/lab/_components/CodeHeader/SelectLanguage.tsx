import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import useEditor from "../../hooks/useEditor";

function SelectLanguage() {
  const { allowLanguages, selectedLanguage, setSelectedLanguage } = useEditor();

  const displayLanguages = Object.entries(allowLanguages).map((entry) => ({
    key: entry[0],
    value: entry[1],
  }));

  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        {displayLanguages.map(({ key, value }) => (
          <SelectItem key={key} value={key}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectLanguage;
