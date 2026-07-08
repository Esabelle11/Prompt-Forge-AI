import { ZipArchive } from "archiver";
import { PassThrough } from "stream";
import type { ProjectFile } from "@/types/project";

export function createZip(
  projectName: string,
  files: ProjectFile[]
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = new ZipArchive({ zlib: { level: 9 } });
    const stream = new PassThrough();
    const chunks: Buffer[] = [];

    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
    archive.on("error", reject);

    archive.pipe(stream);

    for (const file of files) {
      archive.append(file.content, { name: `${projectName}/${file.path}` });
    }

    archive.finalize();
  });
}
