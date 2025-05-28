import { useState } from "react";
import { ResizingInput } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CharacterCard, CharacterPosition } from "./characterCard";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const musicOptions = [
  // Music
  "50s",
  "AbigailFlute",
  "AbigailFluteDuet",
  "aerobics",
  "archaeo",
  "bigDrums",
  "breezy",
  "caldera",
  "Cavern",
  "christmasTheme",
  "Cloth",
  "CloudCountry",
  "clubloop",
  "cowboy_boss",
  "cowboy_outlawsong",
  "Cowboy_OVERWORLD",
  "Cowboy_singing",
  "Cowboy_undead",
  "crane_game",
  "crane_game_fast",
  "fall3",
  "fallFest",
  "libraryTheme",
  "MainTheme",
  "Majestic",
  "sam_acoustic1",
  "sam_acoustic2",
  "sampractice",
  "spirits_eve",
  "spring1",
  "spring2",
  "sweet",
  "tickTock",
  "tinymusicbox",
  "title_night",
  "tribal",
  "Tropical Jam",

  // Music (ambient)
  "ocean",
  "ocean waves",
  "pool_ambient",
  "rain",
  "roadnoise",
  "spring_day_ambient",
  "spring_night_ambient",
  "summer_day_ambient",
  "tropical_island_day_ambient",
  "Upper_Ambient",
  "Volcano_Ambient",
  "waterfall",
  "waterfall_big",
  "wind",
  "winter_day_ambient",
  "custom"
];

export type StarterCommands = {
  music: string;
  coordinates: {x: number, y: number};
  characterPositions: CharacterPosition[];
};

export function StarterCommandsEditor({
  setStarterCommands,
  starterCommands,
}: {
  setStarterCommands: (starterCommands: StarterCommands) => void;
  starterCommands: StarterCommands;
}) {
  const [selectedMusic, setSelectedMusic] = useState(musicOptions[0]);
  const [customMusic, setCustomMusic] = useState("");
  const [coordinates, setCoordinates] = useState({x: 0, y: 0});
  const [characterPositions, setCharacterPositions] = useState<CharacterPosition[]>([
    {
      characterId: "farmer",
      x: 0,
      y: 0,
      direction: 0
    }
  ]);

  const handleMusicChange = (value: string) => {
    setSelectedMusic(value);
    setStarterCommands({...starterCommands, music: value});
  };

  const handleCoordinatesChange = (newCoordinates: {x: number, y: number}) => {
    setCoordinates(newCoordinates);
    setStarterCommands({...starterCommands, coordinates: newCoordinates});
  };

  const addCharacter = () => {
    setCharacterPositions([...characterPositions, {
      characterId: "",
      x: 0,
      y: 0,
      direction: 0
    }]);
    setStarterCommands({...starterCommands, characterPositions: characterPositions});
  };

  const removeCharacter = (id: number) => {
    setCharacterPositions(characterPositions.filter((_, i) => i !== id));
    setStarterCommands({...starterCommands, characterPositions: characterPositions});
  };

  const updateCharacter = (id: number, arg: CharacterPosition) => {
    const newCharacterPositions = characterPositions.map((cp, i) => i === id ? {...cp, ...arg} : cp);
    setCharacterPositions(newCharacterPositions);
    setStarterCommands({...starterCommands, characterPositions: newCharacterPositions});
    console.log("character updated", arg, characterPositions, starterCommands);
  };

  return (
    <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Music</h3>
        <div className="space-y-2">
          <Select value={selectedMusic} onValueChange={handleMusicChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select music..." />
            </SelectTrigger>
            <SelectContent>
              {musicOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedMusic === "custom" && (
            <ResizingInput
              placeholder="Enter custom music..."
              value={customMusic}
              onChange={(e) => setCustomMusic(e.target.value)}
              className="w-full"
            />
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Camera Coordinates</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Label>x: </Label>
            <ResizingInput
              type="number"
              placeholder="x"
              spanOffset={10}
              value={coordinates.x}
              onChange={(e) => handleCoordinatesChange({...coordinates, x: Number(e.target.value)})}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label>y: </Label>
            <ResizingInput
              type="number"
              placeholder="y"
              spanOffset={10}
              value={coordinates.y}
              onChange={(e) => handleCoordinatesChange({...coordinates, y: Number(e.target.value)})}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-lg font-medium mb-2">Character Definitions</h3>
          <Button onClick={addCharacter} className="mt-2" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-1 space-y-1.5">
          {characterPositions.map((characterPosition, index) => (
            <CharacterCard
              key={index}
              id={index}
              characterPosition={characterPosition}
              removeCard={removeCharacter}
              updateArgs={updateCharacter}
            />
          ))}
        </div>
      </div>
    </div>
    </ScrollArea>
  );
}
