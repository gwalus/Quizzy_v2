import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnswerModel } from '../_models/answerModel';
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
    return this.http.get<Category[]>(this.baseUrl + '/categories');
  }

  getQuestion() {
    return this.http.get<QuestionDb>(this.baseUrl + '?categoryId=' + this.choosedCategory);
  }

  setCategory(categoryId: string) {
    this.choosedCategory = categoryId;
  }

  checkAnswer(questionId: string, userAnswer: string) {
    let answerModel: AnswerModel = new AnswerModel();
    answerModel.questionId = questionId;
    answerModel.userAnswer = userAnswer;

    return this.http.post<string>(this.baseUrl + '/check-answer', answerModel);
  }
}
