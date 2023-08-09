export interface UseFetchReturnModel<T> {
    data?: T;
    error?: unknown;
    loading?: boolean;
    messageError?: string;
    handleCancelRequest?: () => void;    
} 