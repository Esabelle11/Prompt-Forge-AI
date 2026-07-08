export function parseModelJson<T>(text: string): T {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON object found.");
  }

  const json = text.slice(start, end + 1);

  return JSON.parse(json) as T;
}