import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { QuestionDb } from '../_models/questionDb';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = environment.baseUrl + 'questions';
  questionCache = new Map();
  choosedCategory: string;

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

  getQuestion() {
    return this.http.get<QuestionDb>(this.baseUrl + '?categoryId=' + this.choosedCategory);
  }

  setCategory(categoryId: string) {
    this.choosedCategory = categoryId;
  }

  checkAnswer(categoryId: string, userAnswer: string) {
    return this.http.get<string>(this.baseUrl + '/check-answer?categoryId=' + categoryId + '&userAnswer=' + userAnswer);
  }
}
