// https://github.com/ferrucc-io/emoji-picker/blob/master/demo/src/playground/DefaultPickerExample.tsx
import { EmojiPicker as FerruccEmojiPicker } from "@ferrucc-io/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

interface DefaultPickerExampleProps {
  onEmojiSelect: (emoji: string) => void;
}

function EmojiPicker({ onEmojiSelect }: DefaultPickerExampleProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleOnEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    onEmojiSelect(emoji);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <div className="rounded-lg bg-(--gray-2) border border-(--gray-6) w-12 h-12 flex justify-center items-center text-3xl">
          {selectedEmoji}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom">
        <FerruccEmojiPicker
          className="border-none shadow-none"
          onEmojiSelect={handleOnEmojiSelect}
          emojisPerRow={8}
          emojiSize={30}
        >
          <FerruccEmojiPicker.Header className="mt-2">
            <FerruccEmojiPicker.Input
              autoFocus={true}
              placeholder="Search emoji"
            />
          </FerruccEmojiPicker.Header>
          <FerruccEmojiPicker.Group>
            <FerruccEmojiPicker.List containerHeight={400} />
          </FerruccEmojiPicker.Group>
        </FerruccEmojiPicker>
      </PopoverContent>
    </Popover>
  );
}

export default EmojiPicker;
