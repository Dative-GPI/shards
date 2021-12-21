export interface Column {
    [key: string]: any,
    hidden: boolean;
    index: number;
    configurable?: boolean
    
    text?: string;
    value?: string;
    align?: 'start' | 'center' | 'end',
    sortable?: boolean,
    filterable?: boolean,
    groupable?: boolean,
    divider?: boolean,
    class?: string | string[],
    cellClass?: string | string[],
    width?: string | number,
    filter?: (value: any, search: string, item: any) => boolean,
    sort?: (a: any, b: any) => number
}