export interface ProjectFile {
  path: string;
  content: string;
}

export interface GeneratedProject {
  projectName: string;
  files: ProjectFile[];
  zipBase64: string;
}
