export interface Widget {
  id: string;
  templateId: string;
  code: string;
  width: number;
  height: number;
  x: number;
  y: number;
  meta: { [key: string]: string };
}