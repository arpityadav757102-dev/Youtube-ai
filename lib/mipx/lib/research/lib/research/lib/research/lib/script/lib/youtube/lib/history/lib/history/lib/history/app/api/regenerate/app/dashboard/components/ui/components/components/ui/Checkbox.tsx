// components/ui/Checkbox.tsx // -------------------------------------------------- // REUSABLE CHECKBOX COMPONENT // Multi-select options (creator type, filters, settings) // --------------------------------------------------

"use client";

import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; }

export function Checkbox({ label, className = "", id, ...props }: CheckboxProps) { const checkboxId = id || checkbox-${Math.random().toString(36).slice(2, 8)};

return ( <label
htmlFor={checkboxId}
className="flex items-center gap-2 cursor-pointer text-sm"
> <input id={checkboxId} type="checkbox" className={h-4 w-4 rounded border-gray-300 focus:ring-black ${className}} {...props} /> <span>{label}</span> </label> ); }
