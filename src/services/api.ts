import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8004/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gym_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Go 백엔드(gowoobro 스타일)의 목록 응답 { code, items, total } 을
    // 프론트가 기대하는 Spring 스타일 envelope { content, totalElements, ... } 로 정규화.
    // (단건 { item } / 생성 { id } 는 이미 호환되므로 그대로 둔다)
    const d = response.data as Record<string, unknown> | null;
    if (d && typeof d === 'object' && !Array.isArray(d)) {
      if (Array.isArray((d as { items?: unknown }).items)) {
        const items = (d as { items: unknown[] }).items;
        const params = (response.config?.params ?? {}) as Record<string, unknown>;
        const page = Number(params.page) || 0;
        const total = Number((d as { total?: unknown }).total) || 0;
        const size = Number(params.pagesize) || items.length || 0;
        const totalPages = size > 0 ? Math.ceil(total / size) : 0;
        const set = (k: string, v: unknown) => {
          if (d[k] === undefined) d[k] = v;
        };
        set('content', items);
        set('totalElements', total);
        set('count', total);
        set('page', page);
        set('pageSize', size);
        set('size', size);
        set('totalPages', totalPages);
        set('first', page <= 0);
        set('last', totalPages === 0 || page >= totalPages - 1);
        set('empty', items.length === 0);
      } else if ((d as { total?: unknown }).total !== undefined && d.count === undefined) {
        // count 응답 { code, total } → count alias
        d.count = (d as { total: unknown }).total;
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('gym_token');
      localStorage.removeItem('gym_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default apiClient;

// Helper function for GET requests
export const get = <T>(url: string, config?: any) => {
  return apiClient.get<T>(url, config);
};

// Helper function for POST requests
export const post = <T>(url: string, data?: unknown, config?: any) => {
  return apiClient.post<T>(url, data, config);
};

// Helper function for PUT requests
export const put = <T>(url: string, data?: unknown, config?: any) => {
  return apiClient.put<T>(url, data, config);
};

export const patch = <T>(url: string, data?: unknown, config?: any) => {
  return apiClient.patch<T>(url, data, config);
};

// Helper function for DELETE requests
export const del = <T>(url: string, config?: any) => {
  return apiClient.delete<T>(url, config);
};
