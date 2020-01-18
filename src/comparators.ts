export interface Comparator<T> {
  
  compare(a: T, b: T): number;
}

export class StringComparator implements Comparator<string> {
  
  compare(a: string, b: string): number {
    return (a === b) ? 0 : (a > b) ? 1 : -1;
  }
}

export class NumberComparator implements Comparator<number> {
  
  compare(a: number, b: number): number {
    return a - b;
  }
}

export class InverseComparator<T> implements Comparator<T> {
  
  constructor(private readonly base: Comparator<T>) {
  }
  
  compare(a: T, b: T): number {
    return -this.base.compare(a, b);
  }
}

export class ArrayComparator<T> implements Comparator<Array<T>> {
  
  constructor(private readonly base: Comparator<T>) {
  }
  
  compare(arrA: T[], arrB: T[]): number {
    const lengthA = arrA.length;
    const lengthB = arrB.length;
    
    const maxLength = Math.max(lengthA, lengthB);
    
    for (let i = 0; i < maxLength; i++) {
      if (i >= lengthA) return -1;
      if (i >= lengthB) return 1;
      
      const result = this.base.compare(arrA[i], arrB[i]);
      
      if (result !== 0) {
        return result;
      }
    }
    
    return 0;
  }
}
