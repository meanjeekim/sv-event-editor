'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PreconditionCommand, EventCommand } from './editor/types';
import { useState } from "react";
import { PreconditionEditor } from "./editor/precondition-editor";
import { EventEditor } from "./editor/event-editor";
import { StarterCommands } from "./editor/starter-commands-editor";

export default function Home() {
  const [starterCommands, setStarterCommands] = useState<StarterCommands>({
    music: "",
    coordinates: {x: 0, y: 0},
    characterPositions: []
  });
  const [preconditions, setPreconditions] = useState<PreconditionCommand[]>([]);
  const [commands, setCommands] = useState<EventCommand[]>([]);
  const [isVerbose, setIsVerbose] = useState<boolean>(false);
  const [pId, setPId] = useState<number>(0);
  const [cId, setCId] = useState<number>(0);

  return (
    <div className="container mx-auto py-8">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-amber-600">Event Editor</h1>
          <div className="flex flex-row items-center gap-2">
            <Label htmlFor="verbose-switch">Show description</Label>
            <Switch id="verbose-switch" checked={isVerbose} onCheckedChange={setIsVerbose} />
          </div>
        </div>
        <p className="text-gray-500 mt-1">Edit your event details, preconditions, and script</p>
      </header>

      <Tabs defaultValue="preconditions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="preconditions">Preconditions</TabsTrigger>
          <TabsTrigger value="script">Script</TabsTrigger>
        </TabsList>

        {/* Preconditions Tab */}
        <TabsContent value="preconditions">
          <PreconditionEditor 
            pId={pId}
            setPId={setPId}
            preconditions={preconditions} 
            setPreconditions={setPreconditions} 
            isVerbose={isVerbose} 
          />
        </TabsContent>

        {/* Script Tab */}
        <TabsContent value="script">
          <EventEditor 
            setStarterCommands={setStarterCommands}
            preconditions={preconditions}
            starterCommands={starterCommands}
            commands={commands}
            setCommands={setCommands}
            isVerbose={isVerbose}
            cId={cId}
            setCId={setCId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
