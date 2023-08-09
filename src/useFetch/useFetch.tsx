import { useEffect, useState } from 'react';

// models
import { UseFetchPropsModel } from './models/UseFetchPropsModel';
import { UseFetchReturnModel } from './models/UseFetchReturnModel';
import { ErrorModel } from './models/ErrorModel';

// utils
import { fetchData } from 'src/useFetch/utils/fetchData';

export function useFetch<DinamicType>({
    url,
    options,
    dependencies= []
}: UseFetchPropsModel): UseFetchReturnModel<DinamicType> {
    const [data, setData] = useState<DinamicType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorModel>({
        message: options.messageError ?? '',
        error: null,
        existError: false,
    });
    const [controllerFetch, setControllerFetch] = useState<AbortController | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        setControllerFetch(abortController);
        setLoading(true);

        // Fetch
        fetchData({url, options, setData, setLoading, setError, abortController});
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