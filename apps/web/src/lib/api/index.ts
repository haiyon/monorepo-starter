import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { showError, showInfo } from '@/lib/utils';

/**
 * API request client for making HTTP requests to the backend
 */
class ApiRequest {
  private instance: AxiosInstance;

  constructor() {
    // Create axios instance with base configuration
    this.instance = axios.create({
      baseURL: process.env['VITE_API_URL'] || '',
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor to attach auth token
    this.instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response) {
          // Handle specific HTTP error status codes
          switch (error.response.status) {
            case 401:
              // Unauthorized - redirect to login
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              showError('Your session has expired. Please log in again.');
              window.location.href = '/login?expired=true';
              break;
            case 403:
              // Forbidden
              showError('You do not have permission to perform this action.');
              break;
            case 429:
              // Rate limited
              showInfo('Too many requests. Please try again later.');
              break;
            case 500:
              // Server error
              showError('An unexpected server error occurred. Please try again later.');
              break;
            default:
              // Handle API error responses with success: false
              if (error.response.data && error.response.data.message) {
                showError(error.response.data.message);
              } else {
                showError(`Request failed with status ${error.response.status}`);
              }
          }
        } else if (error.request) {
          // Request was made but no response received
          showError('No response received from server. Please check your network connection.');
        } else {
          // Request setup error
          showError(`Error setting up request: ${error.message}`);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Perform GET request
   * @param url - API endpoint
   * @param config - Axios request config
   * @returns Promise with response
   */
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  /**
   * Perform POST request
   * @param url - API endpoint
   * @param data - Request body data
   * @param config - Axios request config
   * @returns Promise with response
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  /**
   * Perform PUT request
   * @param url - API endpoint
   * @param data - Request body data
   * @param config - Axios request config
   * @returns Promise with response
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  /**
   * Perform PATCH request
   * @param url - API endpoint
   * @param data - Request body data
   * @param config - Axios request config
   * @returns Promise with response
   */
  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  /**
   * Perform DELETE request
   * @param url - API endpoint
   * @param config - Axios request config
   * @returns Promise with response
   */
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

// Export a singleton instance
export const apiRequest = new ApiRequest();
