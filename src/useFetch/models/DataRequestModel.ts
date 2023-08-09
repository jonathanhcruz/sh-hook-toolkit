export interface DataRequestModel {
    url: string;
    method?: string;
    headers?: {[key: string]: string;};
    body?: {[key: string]: string;} | unknown;
    messageError?: string;
}