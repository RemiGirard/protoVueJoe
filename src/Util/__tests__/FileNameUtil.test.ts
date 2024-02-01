import {describe, it, expect} from 'vitest';
import {fileNameFromPath} from '../FileNameUtil';

describe('FileNameUtil', () => {
  it('should return empty string if empty string', () => {
    expect(fileNameFromPath('')).toBe('');
  });

  it('should return fileName if just fileName', () => {
    expect(fileNameFromPath('text.txt')).toBe('text.txt');
  });

  it('should return fileName for local file', () => {
    expect(fileNameFromPath('./text.txt')).toBe('text.txt');
  });

  it('should return fileName for upper file', () => {
    expect(fileNameFromPath('./parent/text.txt')).toBe('text.txt');
  });

  it('should return fileName for down file', () => {
    expect(fileNameFromPath('child/text.txt')).toBe('text.txt');
  });

  it('should return fileName for absolute file', () => {
    expect(fileNameFromPath('/text.txt')).toBe('text.txt');
  });
});
