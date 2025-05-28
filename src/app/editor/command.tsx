'use client'

import { CompactCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResizingInput } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { PreconditionData, EventData, PreconditionCommand, EventCommand } from "./types"
interface EditorProps {
  card: PreconditionData | EventData
  isVerbose: boolean
  addCard: (name: string, args: string[]) => void
}

interface CommandProps {
  id: number
  type: "precondition" | "event"
  card: PreconditionCommand | EventCommand
  isVerbose: boolean
  removeCard: (id: number | undefined) => void
  updateArgs: (id: number, args: string[]) => void
}

function EditorCard({ card, isVerbose, addCard }: EditorProps) {
  const [values, setValues] = useState<string[]>(new Array(card.argumentNames.length).fill(''));

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <CompactCard>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {card.name}
              {card.argumentNames.map((arg, index) => (
                <ResizingInput
                  key={index}
                  placeholder={arg}
                  value={values[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addCard(card.name, values);
                      setValues(new Array(card.argumentNames.length).fill(''));
                    }
                  }}
                />
              ))}
            </div>
            <div className="ml-auto self-start">
              <Button variant="outline" size="icon" onClick={() => {
                addCard(card.name, values)
                setValues(new Array(card.argumentNames.length).fill(''))
              }}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {isVerbose && (
        <CardContent>
          <div>
            <h3 className="text-sm font-light mb-2">{card.description}</h3>
          </div>
        </CardContent>
      )}
    </CompactCard>
  );
}

function CommandCard({ id, type, card, isVerbose, removeCard, updateArgs }: CommandProps) {
  const [values, setValues] = useState<string[]>(card.arguments);

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    updateArgs(id, newValues);
  };

  return (
    <CompactCard>
      <CardHeader>
        <CardTitle >
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-wrap items-center align-middle gap-2">
              {type === "precondition" ? (card as PreconditionCommand).alias ?? card.name : card.name}
              {card.argumentNames.map((argName, index) => (
                <ResizingInput
                  key={index}
                  placeholder={argName}
                  value={values[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ))}
            </div>
            <div className="ml-auto">
              <Button variant="outline" size="icon" onClick={() => removeCard(id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {isVerbose && (
        <CardContent>
          <div>
            <h3 className="text-sm font-light mb-2">{card.description}</h3>
          </div>
        </CardContent>
      )}
    </CompactCard>
  );
}

export { EditorCard, CommandCard }