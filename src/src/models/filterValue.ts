export interface FilterValue {
    hidden: boolean;
    text: string;
    value: string;

    filter?: (value: any, property: any, item: any) => boolean;
}