import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = environment.baseUrl + 'questions';
  questionCache = new Map();

  constructor(private http: HttpClient) { }

  getCategories() {
    let response = this.questionCache.get('categories');
    if (response) {
      return of(response);
    }

    return this.http.get<Category[]>(this.baseUrl + '/categories').pipe(
      map(response => {
        this.questionCache.set('categories', response);
        return response;
      })
    );
  }

  getQuestion(categoryId: string) {
    return this.http.get<Category[]>(this.baseUrl + '?categoryId=' + categoryId);
  }
}
