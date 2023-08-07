export interface UseFetchModel {
    url: string;
    method: string;
    headers?: unknown;
    body?: unknown;
    dependencies?: unknown[];
    messageError?: string;
}