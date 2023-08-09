import { DataRequestModel } from "../models/DataRequestModel";

export interface FetchDataType {
    dataRequest: DataRequestModel;
    setData: Function;
    setLoading: Function;
    setError: Function;
    abortController?: AbortController;
}