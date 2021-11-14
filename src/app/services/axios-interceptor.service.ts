import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({providedIn: 'root'})
@Injectable({
  providedIn: 'root'
})
export class AxiosInterceptorService {

  constructor() { }
  intercept() {
    axios.interceptors.request.use(request => {
        request.headers['Content-Type'] = 'application/json; charset=utf-8';
        request.headers.Accept = 'application/json';
        console.log(request);
        return request;
    });
  }

}

export function AxiosConfigFactory(axiosIntercept: AxiosInterceptorService): any {
  return () => axiosIntercept.intercept();
}
