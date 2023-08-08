export interface RequestModel {
    url: string;
    method?: string;
    headers?: {[key: string]: string;};
    body?: {[key: string]: string;} | unknown;
    abortController?: AbortSignal;
}