export interface OptionsModel {
    method?: string;
    headers?: {[key: string]: string;};
    body?: {[key: string]: string;} | unknown;
    messageError?: string;
}