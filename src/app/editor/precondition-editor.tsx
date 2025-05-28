'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PreconditionCommand, PreconditionLookup } from "./types";
import { CommandCard, EditorCard } from "./command";
import allPreconditions from '../../data/preconditions.json';
import { Input } from "@/components/ui/input";
import { useState } from "react";

const preconditionsLookup: PreconditionLookup = allPreconditions.reduce((acc, precondition) => {
  acc[precondition.name] = precondition;
  return acc;
}, {} as PreconditionLookup);

interface PreconditionEditorProps {
  pId: number;
  setPId: (id: number) => void;
  preconditions: PreconditionCommand[];
  setPreconditions: (preconditions: PreconditionCommand[]) => void;
  isVerbose: boolean;
}

export function PreconditionEditor({ pId, setPId, preconditions, setPreconditions, isVerbose }: PreconditionEditorProps) {
  const addPrecondition = (name: string, args: string[]) => {
    const newId = pId;
    const newPrecondition = {
      id: newId,
      ...preconditionsLookup[name],
      arguments: args.map(arg => arg.trim())
    };
    setPreconditions([...preconditions, newPrecondition]);
    console.log(preconditions);
    setPId(pId + 1);
  }

  const [shownPreconditions, setShownPreconditions] = useState(allPreconditions);

  const removePrecondition = (id: number | undefined) => {
    if (id !== undefined) {
      setPreconditions(preconditions.filter((p) => p.id !== id))
    }
  }

  const updatePrecondition = (id: number, args: string[]) => {
    setPreconditions(preconditions.map((p) => p.id === id ? { ...p, arguments: args } : p))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-250px)]">
      {/* Column 1: Preconditions Editor*/}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Event Preconditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search preconditions..."
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm === "") {
                  setShownPreconditions(allPreconditions);
                  return;
                }
                const filteredPreconditions = allPreconditions.filter(
                  (precondition) =>
                    precondition.name.toLowerCase().includes(searchTerm) ||
                    precondition.description.toLowerCase().includes(searchTerm)
                );                
                setShownPreconditions(filteredPreconditions);
              }}
            />
          </div>
          <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
            <div className="p-1 space-y-1">
              {shownPreconditions.map((precondition) => (
                <EditorCard 
                  key={precondition.name} 
                  card={precondition}
                  isVerbose={isVerbose} 
                  addCard={addPrecondition}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      {/* Column 2: Commands */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Preconditions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <div className="p-1 space-y-1">
              {preconditions.map((precondition) => (
                <CommandCard
                  key={precondition.id}
                  id={precondition.id}
                  type="precondition"
                  card={precondition}
                  isVerbose={isVerbose}
                  removeCard={removePrecondition}
                  updateArgs={updatePrecondition}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 