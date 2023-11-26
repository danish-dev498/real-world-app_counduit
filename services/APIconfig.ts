import axios from 'axios';
interface fetchWrapProps {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  body?: string;
  signal?: AbortSignal;
}

const fetchWrapper = async ({ method, url, body, signal }: fetchWrapProps) => {
  const token = localStorage.getItem('token');
  const config = {
    baseURL: 'https://api.realworld.io/api',
    headers: {
      Authorization: !!token ? `Token ${token}` : '',
    },
    signal: signal,
  };
  try {
    const { data } =
      (method === 'get' && (await axios.get(url, config))) ||
      (method === 'post' && (await axios.post(url, body, config)));
    return data;
  } catch (Error) {
    throw Error;
  }
};

export const GET = (url: string, signal?: AbortSignal) =>
  fetchWrapper({ method: 'get', url, signal });

export const POST = (url: string, body: string, signal?: AbortSignal) =>
  fetchWrapper({ method: 'post', url, body, signal });
