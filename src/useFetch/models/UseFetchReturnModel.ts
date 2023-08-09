export interface UseFetchReturnModel<T> {
    data: T | null;
    error?: unknown;
    loading?: boolean;
    messageError?: string;
    handleCancelRequest?: () => void;    
} 