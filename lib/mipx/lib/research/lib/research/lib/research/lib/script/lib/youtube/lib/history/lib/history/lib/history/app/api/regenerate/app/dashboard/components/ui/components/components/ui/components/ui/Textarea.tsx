// components/ui/Textarea.tsx // -------------------------------------------------- // REUSABLE TEXTAREA COMPONENT // Long text inputs (topic, notes, future prompts) // --------------------------------------------------

"use client";

import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; error?: string; }

export function Textarea({ label, error, className = "", id, ...props }: TextareaProps) { const textareaId = id || textarea-${Math.random().toString(36).slice(2, 8)};

return ( <div className="space-y-1"> {label && ( <label
htmlFor={textareaId}
className="block text-sm font-medium text-gray-700"
> {label} </label> )}

<textarea
    id={textareaId}
    className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black resize-none ${
      error ? "border-red-500" : "border-gray-300"
    } ${className}`}
    {...props}
  />

  {error && <p className="text-xs text-red-600">{error}</p>}
</div>

); }
