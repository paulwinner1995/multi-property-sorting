import {Comparator, InverseComparator} from './comparators';
import {Property, SortOrder}           from './property';

export function sort<T>(array: T[], properties: Property<T>[]): T[] {
  return array.sort((a, b) => {
    for (const property of properties) {
      let comparator: Comparator<any> = property.getComparator();
      
      if (property.getSortOrder() === SortOrder.DESC) {
        comparator = new InverseComparator<any>(comparator);
      }
      
      const valueA = property.getValue(a);
      const valueB = property.getValue(b);
      
      const comparisonResult = comparator.compare(valueA, valueB);
      
      if (comparisonResult !== 0) {
        return comparisonResult;
      }
    }
    
    // prevent sorting when properties are empty
    return 0;
  });
}
