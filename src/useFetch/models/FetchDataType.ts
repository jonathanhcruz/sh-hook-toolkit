import { OptionsModel } from "./OptionsModel";

export interface FetchDataType {
    url: string;
    options: OptionsModel;
    setData: Function;
    setLoading: Function;
    setError: Function;
    abortController?: AbortController;
}