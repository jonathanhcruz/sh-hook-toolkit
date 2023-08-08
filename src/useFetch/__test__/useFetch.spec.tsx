// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react'

// hooks
import { useFetch} from 'src';

// models
import { TestModelResolt } from './models/TestModelResolt';

describe('useFetch', () => {

    it('should execute correctly useFetch and show data in null and loading in true', async () => {
        const headers = { Authorization: 'Bearer token' };
        const { result } = renderHook( () => useFetch<TestModelResolt>({ url: 'https://jsonplaceholder.typicode.com/todos/1', headers, messageError: 'error' }));
        expect(result.current.data).toBe(null);
        expect(result.current.loading).toBe(true);
    });

    it('should verify data return if it equal to type TestModelResolt', async () => {
        const { result } = renderHook( () => useFetch<TestModelResolt>({ url: 'https://jsonplaceholder.typicode.com/todos/1', messageError: 'error' }));
        expect(result.current.data).toBe(null);
    });
});