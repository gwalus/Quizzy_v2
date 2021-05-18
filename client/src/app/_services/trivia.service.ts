import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { NumbersOfQuestions } from '../_models/numbersOfQuestions';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Question } from '../_models/question';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  baseUrl = environment.baseUrl + 'trivia/';
  triviaCache = new Map();
  options: string[]

  constructor(private http: HttpClient) { }

  getCategories() {
    let response = this.triviaCache.get('categories');
    if (response) {
      return of(response);
    }

    return this.http.get<Category[]>(this.baseUrl + 'categories').pipe(
      map(response => {
        this.triviaCache.set('categories', response);
        return response;
      })
    );
  }

  getNumbersOfQuestionsCategory(categoryId: string) {
    let response = this.triviaCache.get(categoryId);
    if (response) {
      return of(response);
    }

    let params = new HttpParams();
    params = params.append('categoryId', categoryId);

    return this.http.get<NumbersOfQuestions>(this.baseUrl + 'quantity', { params }).pipe(
      map(response => {
        this.triviaCache.set(categoryId, response);
        return response;
      })
    );
  }

  getQuestions(categoryId: string, difficulty: string, amount: string) {
    let params = new HttpParams();
    params = params.append('categoryId', categoryId);
    params = params.append('difficulty', difficulty);
    params = params.append('amount', amount);

    return this.http.get<Question[]>(this.baseUrl + 'questions', { params })
  }

  setUserOptions(userOptions: string[]) {
    this.options = userOptions;
  }
}
