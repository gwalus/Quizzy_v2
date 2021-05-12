import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { NumbersOfQuestions } from '../_models/numbersOfQuestions';
import { Question } from '../_models/question';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  baseUrl = environment.baseUrl + 'trivia/';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }

  getNumbersOfQuestionsCategory(categoryId: string) {
    let params = new HttpParams();
    params = params.append('categoryId', categoryId);

    return this.http.get<NumbersOfQuestions>(this.baseUrl + 'quantity', { params });
  }

  getQuestions(categoryId: string, difficulty: string, amount: string) {
    let params = new HttpParams();
    params = params.append('categoryId', categoryId);
    params = params.append('difficulty', difficulty);
    params = params.append('amount', amount);

    return this.http.get<Question[]>(this.baseUrl + 'questions', { params });
  }
}
