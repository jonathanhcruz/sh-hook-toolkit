export declare interface UseFetchPropsModel {
    url: string;
    method?: string;
    headers?: {[key: string]: string;};
    body?: {[key: string]: string;} | unknown;
    dependencies?: unknown[];
    messageError?: string;
}