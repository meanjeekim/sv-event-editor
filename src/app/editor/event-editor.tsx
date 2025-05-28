'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { EventCommand, EventLookup, PreconditionCommand } from "./types";
import { CommandCard, EditorCard } from "./command";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

import allCommands from '../../data/eventcommands.json';
import { StarterCommandsEditor } from "./starter-commands-editor";
import { StarterCommands } from "./starter-commands-editor";

const commandsLookup: EventLookup = allCommands.reduce((acc, command) => {
  acc[command.name] = command;
  return acc;
}, {} as EventLookup);

interface EventEditorProps {
  setStarterCommands: (starterCommands: StarterCommands) => void;
  preconditions: PreconditionCommand[];
  starterCommands: StarterCommands;
  commands: EventCommand[];
  setCommands: (commands: EventCommand[]) => void;
  isVerbose: boolean;
  cId: number;
  setCId: (id: number) => void;
}

export function EventEditor({ 
  setStarterCommands,
  preconditions,
  starterCommands,
  commands, 
  setCommands, 
  isVerbose, 
  cId, 
  setCId,
}: EventEditorProps) {
  const { toast } = useToast();
  const [isPreviewScript, setIsPreviewScript] = useState(false);
  const [shownCommands, setShownCommands] = useState(allCommands);
  const addCommand = (name: string, args: string[]) => {
    const newId = cId;
    const newCommand = {
      id: newId,
      ...commandsLookup[name],
      arguments: args.map(arg => arg.trim())
    };
    setCommands([...commands, newCommand]);
    setCId(cId + 1);
  }

  const removeCommand = (id: number | undefined) => {
    if (id !== undefined) {
      setCommands(commands.filter((c) => c.id !== id));
    }
  }

  const updateCommand = (id: number, args: string[]) => {
    setCommands(commands.map((c) => c.id === id ? { ...c, arguments: args } : c));
  }

  const preconditionsScript = preconditions.map((p) => p.name + " " + p.arguments.join(" ")).join("/");
  const starterCommandsScript = starterCommands.music + "/" + starterCommands.coordinates.x + "/" + starterCommands.coordinates.y + "/" + starterCommands.characterPositions.map((cp) => cp.characterId + " " + cp.x + " " + cp.y + " " + cp.direction);;
  const argumentsScript = commands.map((c) => c.name + " " + c.arguments.join(" ")).join("/");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-250px)]">
      {/* Column 1: Commands */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search event commands..."
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm === "") {
                  setShownCommands(allCommands);
                  return;
                }
                const filteredCommands = allCommands.filter(
                  (command) =>
                    command.name.toLowerCase().includes(searchTerm) ||
                    command.description.toLowerCase().includes(searchTerm)
                );
                setShownCommands(filteredCommands);
              }}
            />
          </div>
          <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
            <div className="p-1 space-y-1">
              {shownCommands.map((command, index) => (
                <EditorCard 
                  key={index} 
                  card={command}
                  isVerbose={isVerbose} 
                  addCard={addCommand}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Column 2: Script Editor */}
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Script</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <Switch id="script-as-block-or-string-switch" checked={isPreviewScript} onCheckedChange={setIsPreviewScript} />
            <Label htmlFor="script-as-block-or-string-switch">Show script preview</Label>
          </div>
        </CardHeader>
        <CardContent>
          {isPreviewScript && (
            <div className="flex justify-end mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(preconditionsScript + ": " + starterCommandsScript + "/" + argumentsScript);
                  toast({
                    title: "Copied to clipboard"
                  });
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Script
              </Button>
            </div>
          )}
          <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
            {isPreviewScript ? (
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded min-h-full font-mono text-sm">
                <pre className="whitespace-pre-wrap">
                  {preconditionsScript + ": " + starterCommandsScript + "/" + argumentsScript}
                </pre>
              </div>
            ) : (
              <div className="p-1 space-y-1">
                {commands.map((cmd) => (
                  <CommandCard
                    key={cmd.id}
                    id={cmd.id}
                    type="event"
                    card={cmd}
                    isVerbose={isVerbose}
                    removeCard={removeCommand}
                    updateArgs={updateCommand}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Column 3: Preview/Properties */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-60px)] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Preview</h3>
              <div className="bg-slate-200 dark:bg-slate-900 rounded aspect-video flex items-center justify-center text-sm text-slate-500">
                Preview will appear here
              </div>
            </div>
            <StarterCommandsEditor setStarterCommands={setStarterCommands} starterCommands={starterCommands} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 