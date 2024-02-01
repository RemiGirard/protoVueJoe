export const fileNameFromPath = (path: string): string => {
  return path.split(/[\\/]/).pop() ?? '';
}