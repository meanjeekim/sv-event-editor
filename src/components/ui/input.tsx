'use client'
import * as React from "react"
import { useRef, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function CompactInput({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-6 w-fit min-w-0 rounded-md border bg-transparent px-2 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-light disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

interface ResizingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  spanOffset?: number;
}

function ResizingInput({ className, type, spanOffset = 0, value = '', placeholder, onChange, onBlur, ...props }: ResizingInputProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [localValue, setLocalValue] = useState(value);

  useLayoutEffect(() => {
    if (spanRef.current) {
      // Add a small buffer to prevent text from being cut off
      setInputWidth(spanRef.current.offsetWidth + spanOffset + 1);
    }
  }, [spanOffset, localValue, placeholder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    console.log("handleChange", e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
      console.log("handleBlur: onChange", e.target.value);
    }
    if (onBlur) {
      onBlur(e);
      console.log("handleBlur: onBlue", e.target.value);
    }
  };

  return (
    <div className="relative inline-block">
      <input
        type={type}
        value={localValue}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-6 min-w-0 rounded-md border bg-transparent px-2 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-light disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        style={{ width: inputWidth ? `${inputWidth}px` : undefined }}
        {...props}
      />
      <span
        ref={spanRef}
        className="invisible absolute whitespace-pre px-2.5 py-1 text-base md:text-sm"
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          position: "absolute",
          visibility: "hidden"
        }}
      >
        {localValue || placeholder || ""}
      </span>
    </div>
  );
}

export { Input, CompactInput, ResizingInput }
