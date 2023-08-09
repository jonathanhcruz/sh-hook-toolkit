import { DataRequestModel } from "./DataRequestModel";

export interface FetchDataType {
    dataRequest: DataRequestModel;
    setData: Function;
    setLoading: Function;
    setError: Function;
    abortController?: AbortController;
}