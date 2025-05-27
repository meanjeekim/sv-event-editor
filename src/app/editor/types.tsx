export interface PreconditionData {
    name: string;
    argumentNames: string[];
    alias: string | null; // Can be string or null
    category: string;
    description: string;
}
  
export interface EventData {
  name: string;
  argumentNames: string[];
  category: string;
  description: string;
}

export interface PreconditionLookup {
  [key: string]: PreconditionData;
}

export interface EventLookup {
  [key: string]: EventData;
}

export interface PreconditionCommand {
  id: number;
  name: string;
  argumentNames: string[];
  arguments: string[];
  alias: string | null; // Can be string or null
  category: string;
  description: string;
}

export interface EventCommand {
  id: number;
  name: string;
  argumentNames: string[];
  arguments: string[];
  category: string;
  description: string;
}