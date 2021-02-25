export interface ProcessProps {
  path: string;
  filename: string;
  param: string;
  addImport: (s: string) => void;
  addFile: (path: string, contents: string) => void;
}

export type RecodulatePlugin = {
  type: "user" | "lib";
  name: string;
  path: string;
};

export type ActionTree = {
  [key: string]: ActionTree | RecodulatePlugin;
};
