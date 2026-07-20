import { promises as fs } from "fs";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "agent-output");

export async function saveOutput(
  filename: string,
  data: unknown
) {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const filePath = path.join(
    OUTPUT_DIR,
    `${filename}.json`
  );

  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export async function loadOutput<T>(
  filename: string
): Promise<T | null> {
  try {
    const filePath = path.join(
      OUTPUT_DIR,
      `${filename}.json`
    );

    const content = await fs.readFile(filePath, "utf8");

    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}