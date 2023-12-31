// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react'

// hooks
import { useFetch } from 'src';

// // utils
import { fetchData } from 'src/useFetch/utils/fetchData';

// models
import { TestModelResolt } from './models/TestModelResolt';

vi.mock('src/useFetch/utils/fetchData');

describe('useFetch', () => {
    it('should execute correctly useFetch and show data in null and loading in true', async () => {
        const headers = { Authorization: 'Bearer token' };
        const { result } = renderHook( () => useFetch<TestModelResolt>({ url: 'https://jsonplaceholder.typicode.com/todos/1', options: { headers, messageError: 'error'} }));
        expect(result.current.data).toBe(null);
        expect(result.current.loading).toBe(true);
    });

    it('should execute useFetch', async () => {
        renderHook( () => useFetch<TestModelResolt>({url: 'https://jsonplaceholder.typicode.com/todos/1', options:{ messageError: 'error'} }));
        expect(fetchData).toBeCalledTimes(1);
    });
});