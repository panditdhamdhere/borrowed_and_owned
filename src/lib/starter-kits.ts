import kits from "@/content/starter-kits.json";
import type { StarterKit } from "./types";

export function getAllStarterKits(): StarterKit[] {
  return kits as StarterKit[];
}

export function getStarterKitById(id: string): StarterKit | undefined {
  return getAllStarterKits().find((kit) => kit.id === id);
}
