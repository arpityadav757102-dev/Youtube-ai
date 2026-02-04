// components/ui/Input.tsx // -------------------------------------------------- // REUSABLE INPUT COMPONENT // Label + error support, accessibility-safe // --------------------------------------------------

"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; }

export function Input({ label, error, className = "", id, ...props }: InputProps) { const inputId = id || input-${Math.random().toString(36).slice(2, 8)};

return ( <div className="space-y-1"> {label && ( <label
htmlFor={inputId}
className="block text-sm font-medium text-gray-700"
> {label} </label> )}

<input
    id={inputId}
    className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black ${
      error ? "border-red-500" : "border-gray-300"
    } ${className}`}
    {...props}
  />

  {error && <p className="text-xs text-red-600">{error}</p>}
</div>

); }
