import { useEffect, useState } from 'react';
import { UseFetchPropsModel } from './models/UseFetchPropsModel';
import { UseFetchReturnModel } from './models/UseFetchReturnModel';

export function useFetch<DinamicType>({
    url,
    method= 'GET',
    dependencies= [],
    messageError = '',
    headers,
    body,
}: UseFetchPropsModel): UseFetchReturnModel<DinamicType> {

    const [data, setData] = useState<DinamicType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{
        message: string;
        error: unknown;
        existError: boolean;
    }>({
        message: messageError,
        error: null,
        existError: false,
    });
    const [controllerFetch, setControllerFetch] = useState<AbortController | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        setControllerFetch(abortController);

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, { 
                    headers: { 'Content-Type': 'application/json', ...headers}, 
                    method, 
                    body: JSON.stringify(body),
                    signal: abortController.signal,
                });
                const dataResponse = await response.json();
                setData(dataResponse);
            } catch (error) {
                setError({
                    message: messageError,
                    error,
                    existError: true,
                });
            } finally {
                setLoading(false);
            }
            return () => abortController.abort();
        }
        fetchData();
    }, [...dependencies]);

    const handleCancelRequest = () => {
        controllerFetch?.abort();
        setError({
            message: 'request cancel',
            error: {
                status: 499,
                statusText: 'request cancel'
            },
            existError: true,
        });
    }
    
    return {data, loading, error, handleCancelRequest} as UseFetchReturnModel<DinamicType>;
}