import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = environment.baseUrl + 'question/';
  questionCache = new Map();

  constructor(private http: HttpClient) { }

  getCategories() {
    let response = this.questionCache.get('categories');
    if (response) {
      return of(response);
    }

    return this.http.get(this.baseUrl + 'categories').pipe(
      map(response => {
        this.questionCache.set('categories', response);
        return response;
      })
    );
  }
}
