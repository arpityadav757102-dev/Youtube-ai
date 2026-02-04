// app/layout.tsx // -------------------------------------------------- // ROOT LAYOUT // Global app structure, metadata, and base styles // --------------------------------------------------

import type { Metadata } from "next"; import "./globals.css";

export const metadata: Metadata = { title: "YouTube AI Research Engine", description: "A+++++++ level research, scripts, titles, and YouTube optimization in one place.", };

export default function RootLayout({ children, }: { children: React.ReactNode; }) { return ( <html lang="en"> <body className="antialiased bg-white text-gray-900"> {children} </body> </html> ); }
