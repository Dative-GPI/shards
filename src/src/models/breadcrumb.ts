export interface Breadcrumb {
  id?: string;
  text: string;
  disabled: boolean;
  to?: { name: string, params: { [key: string]: string } },
  exact?: boolean
}