import { CompactCard } from "@/components/ui/card";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { ResizingInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export type CharacterPosition = {
  characterId: string;
  x: number;
  y: number;
  direction: number;
};

interface CharacterProps {
  id: number;
  characterPosition: CharacterPosition;
  removeCard: (id: number) => void;
  updateArgs: (id: number, arg: CharacterPosition) => void;
}

export function CharacterCard({ id, characterPosition, removeCard, updateArgs }: CharacterProps) {
  const handleChange = (index: number, value: string) => {
    const newCharacterPosition = {
      ...characterPosition,
      characterId: index === 0 ? value : characterPosition.characterId,
      x: index === 1 ? Number(value) : characterPosition.x,
      y: index === 2 ? Number(value) : characterPosition.y,
      direction: index === 3 ? Number(value) : characterPosition.direction
    };
    updateArgs(id, newCharacterPosition);
  };

  return (
    <CompactCard>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center gap-2 w-full max-w-[90vw] sm:max-w-[500px]">
            <div className="flex flex-wrap items-center align-middle gap-2 min-w-0 flex-1">
              <ResizingInput
                placeholder="character id"
                value={characterPosition.characterId}
                onChange={(e) => handleChange(0, e.target.value)}
                className="max-w-[10vw] sm:max-w-[17vw]"
              />
              <ResizingInput
                placeholder="x"
                value={characterPosition.x.toString()}
                onChange={(e) => handleChange(1, e.target.value)}
                className="max-w-[10vw] sm:max-w-[17vw]"
              />
              <ResizingInput
                placeholder="y"
                value={characterPosition.y.toString()}
                onChange={(e) => handleChange(2, e.target.value)}
                className="max-w-[10vw] sm:max-w-[17vw]"
              />
              <ResizingInput
                placeholder="direction"
                value={characterPosition.direction.toString()}
                onChange={(e) => handleChange(3, e.target.value)}
                className="max-w-[10vw] sm:max-w-[17vw]"
              />
            </div>
            <div className="ml-auto flex-shrink-0">
              <Button variant="outline" size="icon" onClick={() => removeCard(id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </CompactCard>
  );
}