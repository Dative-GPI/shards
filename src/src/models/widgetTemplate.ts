export interface WidgetTemplate {
  id: string;
  code: string;
  label: string;
  description: string;
  icon: string;
  width: number;
  height: number;
  meta: { [key: string]: string }
}