export interface ProcessProps {
  path: string;
  params: string[];
  write: (s: string) => void;
}

export type ActionTree = {
  [key: string]: string | ActionTree;
};
