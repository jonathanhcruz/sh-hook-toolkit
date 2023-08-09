import { FetchDataType } from '../models/FetchDataType';

export async function fetchData({
    url,
    options: {
    method = 'GET',
    headers = {},
    body = {},
    messageError = 'Error al obtener los datos',
},setData, setLoading, setError, abortController = new AbortController(), }: FetchDataType ){
    try {
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