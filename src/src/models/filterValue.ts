export interface FilterValue {
    hidden: boolean;
    text: string;
    value: string;

    filter?: (value: any, item: any) => boolean;
}