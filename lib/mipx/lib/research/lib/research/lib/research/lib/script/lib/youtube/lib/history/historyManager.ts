// lib/history/historyManager.ts // -------------------------------------------------- // HISTORY MANAGER // Free-version friendly, in-memory history store // DB ke bina kaam karta hai (future migration easy) // --------------------------------------------------

import { HistoryItem, HistoryList } from "@/types/history";

let historyStore: HistoryList = [];

function generateId(): string { return ${Date.now()}-${Math.random().toString(36).slice(2, 8)}; }

/**

addHistoryItem

Naya generated result history me add karta hai */ export function addHistoryItem( item: Omit<HistoryItem, "id" | "createdAt">, ): HistoryItem { const historyItem: HistoryItem = { ...item, id: generateId(), createdAt: Date.now(), };


historyStore.unshift(historyItem); return historyItem; }

/**

getHistory

Latest-first history list return karta hai */ export function getHistory(): HistoryList { return historyStore; }


/**

getHistoryById */ export function getHistoryById(id: string): HistoryItem | undefined { return historyStore.find((h) => h.id === id); }


/**

clearHistory

Free version ke liye optional reset */ export function clearHistory(): void { historyStore = []; }
