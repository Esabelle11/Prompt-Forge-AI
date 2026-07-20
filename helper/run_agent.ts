import { saveOutput, loadOutput } from "@/helper/output_save";


const SAVE_OUTPUT = true;

export async function runAgent<T>(
  key: string,
  fn: () => Promise<T>
): Promise<T> {

  if (SAVE_OUTPUT) {
    const cached = await loadOutput<T>(key);

    if (cached) {
      console.log(`Loaded ${key} from cache`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return cached;
    }
  }

  console.log(`Running ${key}`);

  const result = await fn();

  if (SAVE_OUTPUT) {
    await saveOutput(key, result);
  }

  return result;
}