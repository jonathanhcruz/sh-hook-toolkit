import { useEffect, useState } from 'react';
import { UseFetchModel } from './models/UseFetchModel';


export const useFetch = ({
    url,
    method= 'GET',
    headers,
    dependencies,
    body,
    messageError = ''
}: UseFetchModel): unknown => {

    const [data, setData] = useState<unknown>(null);
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
                    headers: { 'Content-Type': 'application/json', ...headers ?? {} }, 
                    method, 
                    body: JSON.stringify(body ?? {}),
                    signal: abortController.signal
                });
                const dataResponse = await response;
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
    }, dependencies);

    const handleCancelRequest = () => {
        controllerFetch?.abort();
        setError({
            message: 'request cancel',
            error: {
                status: 401,
                statusText: 'request cancel'
            },
            existError: true,
        });
    }
    
    return {data, loading, error, handleCancelRequest};
}