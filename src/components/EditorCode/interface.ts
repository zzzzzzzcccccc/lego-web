export interface EditorCodeProps {
  defaultValue?: any;
  onChange?(value: string): void;
  height?: number | string;
}
