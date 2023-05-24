import { Injectable } from '@angular/core';
import { baseUrl } from './config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  constructor(private http: HttpClient) { }

  getNews(){
    return this.http.get(`${baseUrl}/news`)
  }
  
}
