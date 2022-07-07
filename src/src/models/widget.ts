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

export const instanceOfWidget = (object: any): object is Widget => {
  return (
    "id" in object &&
    "templateId" in object &&
    "code" in object &&
    "width" in object &&
    "height" in object &&
    "x" in object &&
    "y" in object &&
    "meta" in object
  );
}