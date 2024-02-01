export class ObjectUtil {
  static getTrueKeys(value: {}): string[] {
    return Object
      .entries(value)
      .filter(([property, value]) => value)
      .map(([property, value]) => property)
    ;
  }
}