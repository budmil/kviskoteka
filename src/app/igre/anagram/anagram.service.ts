import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class AnagramService {

  constructor(private http: HttpClient) { }


  
}
