import { expect, it, describe } from 'vitest';
import { ObjectUtil } from '../ObjectUtil'

describe('ObjectUtil', () => {
  describe('getTrueKeys', () => {
    it('should return an empty array when there are no truthy keys', () => {
      const obj = { key1: false, key2: 0, key3: '', key4: null };
      const result = ObjectUtil.getTrueKeys(obj);
      expect(result).toEqual([]);
    });

    it('should return an array of truthy keys', () => {
      const obj = { key1: true, key2: 'value', key3: [], key4: false };
      const result = ObjectUtil.getTrueKeys(obj);
      expect(result).toEqual(['key1', 'key2', 'key3']);
    });

    it('should return all keys when all values are truthy', () => {
      const obj = { key1: true, key2: 'value', key3: [] };
      const result = ObjectUtil.getTrueKeys(obj);
      expect(result).toEqual(['key1', 'key2', 'key3']);
    });
  });
});