import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomQuestion } from '../_models/customQuestion';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl + 'admin/';

  constructor(private http: HttpClient) { }

  addCategory(name: string) {
    return this.http.post(this.baseUrl + 'category?name=' + name, {});
  }

  addQuestion(question: CustomQuestion) {
    return this.http.post(this.baseUrl + 'question', question);
  }
}
