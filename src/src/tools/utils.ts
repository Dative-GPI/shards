// Source: https://raw.githubusercontent.com/vuetifyjs/vuetify/v2-stable/packages/vuetify/src/util/helpers.ts

const getNestedValue = (obj: any, path: (string | number)[], fallback?: any): any => {
    const last = path.length - 1;
    if (last < 0) {
        return obj === undefined ? fallback : obj;
    }
    for (let i = 0; i < last; i++) {
        if (obj == null) {
            return fallback;
        }
        obj = obj[path[i]];
    }
    if (obj == null) {
        return fallback;
    }
    return obj[path[last]] === undefined ? fallback : obj[path[last]];
}

const getObjectValueByPath = (obj: any, path: string, fallback?: any): any => {
    if (obj == null || !path || typeof path !== 'string') {
        return fallback;
    }
    if (obj[path] !== undefined) {
        return obj[path];
    }
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');
    return getNestedValue(obj, path.split('.'), fallback);
}
  
const defaultFilter = (value: any, search: string | null, item: any): boolean => {
    return value != null && search != null && typeof value !== 'boolean' && value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
}

export function searchItems<T extends any = any> (items: T[], search: string): T[] {
    if (!search) {
        return items;
    }
    search = search.toString().toLowerCase();
    if (search.trim() === '') {
        return items;
    }
    return items.filter((item: any) => Object.keys(item).some(key => defaultFilter(getObjectValueByPath(item, key), search, item)));
}