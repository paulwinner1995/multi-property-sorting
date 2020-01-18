import {Comparator} from './comparators';

export interface Property<T> {

    getValue(object: T): any;

    getSortOrder(): SortOrder;

    getComparator(): Comparator<any>
}

export enum SortOrder {
    ASC = 'asc', DESC = 'desc'
}