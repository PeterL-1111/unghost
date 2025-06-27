import { parse } from "best-effort-json-parser";

export function parseJSON<T>(json: string | null | undefined, fallback: T): T {
  if (!json) {
    return fallback;
  }
  
  try {
    // Clean up the input more thoroughly
    let cleaned = json.trim();
    
    // Remove markdown code block markers
    cleaned = cleaned
      .replace(/^```(js|json|ts|plaintext|javascript|typescript)?\s*/g, "")
      .replace(/\s*```$/g, "");
    
    // Remove any leading/trailing whitespace again after code block removal
    cleaned = cleaned.trim();
    
    // If the cleaned string starts with a non-JSON character but contains JSON,
    // try to extract the JSON part
    if (!cleaned.startsWith('{') && !cleaned.startsWith('[')) {
      const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (jsonMatch && jsonMatch[1]) {
        cleaned = jsonMatch[1];
      }
    }
    
    // Try standard JSON.parse first (faster for valid JSON)
    try {
      return JSON.parse(cleaned) as T;
    } catch {
      // Fall back to best-effort parser for malformed JSON
      return parse(cleaned) as T;
    }
  } catch (error) {
    console.warn("Failed to parse JSON:", { json, error });
    return fallback;
  }
}
