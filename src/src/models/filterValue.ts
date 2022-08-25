export interface FilterValue {
    hidden: boolean;
    text: string;
    value: string;

    filter?: (value: any) => boolean,
}