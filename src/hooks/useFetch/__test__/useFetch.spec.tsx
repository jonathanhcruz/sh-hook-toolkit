import { describe, it, expect } from 'vitest';
import { useFetch } from "src";

describe('useFetch', () => {
    it('should return url', () => {
        const url = 'http://localhost:3000';
        const result = useFetch({ url });
        expect(result).toBe(url);
    });
});