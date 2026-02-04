// components/ui/Button.tsx // -------------------------------------------------- // REUSABLE BUTTON COMPONENT // Consistent UI + loading + disabled states // --------------------------------------------------

"use client";

import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost"; export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean; }

const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = { primary: "bg-black text-white hover:bg-gray-900 focus:ring-black", secondary: "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-400", ghost: "text-gray-900 hover:bg-gray-100 focus:ring-gray-400", };

const sizeStyles: Record<ButtonSize, string> = { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base", };

export function Button({ variant = "primary", size = "md", loading = false, disabled, className = "", children, ...props }: ButtonProps) { return ( <button className={${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}} disabled={disabled || loading} {...props} > {loading ? "Please wait..." : children} </button> ); }
