import axios, {
  RawAxiosRequestConfig,
  AxiosBasicCredentials,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

export type AxiosMethodWithData = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: RawAxiosRequestConfig<D>
) => Promise<R>;

export type AxiosMethodWithoutData = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config: RawAxiosRequestConfig<D>
) => Promise<R>;

export type AxiosMethod = AxiosMethodWithData | AxiosMethodWithoutData;

axios.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    const { config } = response;
    console.log(config.url, "response", response);
    return response;
  },
  (error) => {
    const { config } = error;
    console.warn(config.url, "error", error);
    return Promise.reject(error);
  }
);

const request = (
  method: AxiosMethod,
  url: string,
  params?: any,
  headers?: AxiosRequestHeaders,
  auth?: AxiosBasicCredentials
) => {
  const req = [
    axios.post as AxiosMethod,
    axios.put as AxiosMethod,
    axios.patch as AxiosMethod,
  ].includes(method)
    ? method(url, params, { headers, auth }) // POST, PUT, PATCH
    : method(url, { params, headers, auth }); // GET, DELETE, HEAD, OPTIONS
  return req;
};

const http = {
  get: (
    url: string,
    params?: any,
    headers?: AxiosRequestHeaders,
    auth?: AxiosBasicCredentials
  ) => request(axios.get, url, params, headers, auth),
  post: (
    url: string,
    params?: any,
    headers?: AxiosRequestHeaders,
    auth?: AxiosBasicCredentials
  ) => request(axios.post, url, params, headers, auth),
  put: (
    url: string,
    params?: any,
    headers?: AxiosRequestHeaders,
    auth?: AxiosBasicCredentials
  ) => request(axios.put, url, params, headers, auth),
  patch: (
    url: string,
    params?: any,
    headers?: AxiosRequestHeaders,
    auth?: AxiosBasicCredentials
  ) => request(axios.patch, url, params, headers, auth),
  delete: (
    url: string,
    params?: any,
    headers?: AxiosRequestHeaders,
    auth?: AxiosBasicCredentials
  ) => request(axios.delete, url, params, headers, auth),
  options: (
    url: string,
    params?: any,
    headers?: AxiosRequestHeaders,
    auth?: AxiosBasicCredentials
  ) => request(axios.options, url, params, headers, auth),
};

export default http;
