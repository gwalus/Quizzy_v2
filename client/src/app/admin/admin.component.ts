import { ArrayType } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Category } from '../_models/category';
import { CustomQuestion } from '../_models/customQuestion';
import { AdminService } from '../_services/admin.service';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  categoryForm: FormGroup;
  questionForm: FormGroup;
  question: CustomQuestion = new CustomQuestion();
  categories: string[];

  constructor(private fb: FormBuilder, private adminService: AdminService, private toastr: ToastrService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getCategories();

    this.categoryForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.questionForm = this.fb.group({
      name: ['', Validators.required],
      question: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      incorrectAnswers: this.fb.array([], Validators.required)
    });

    this.addIncorrectAnswer();
  }

  get questionControl() { return this.questionForm.get('question'); }

  get correctAnswerControl() { return this.questionForm.get('correctAnswer'); }

  get incorrectAnswersControl() { return this.questionForm.get('incorrectAnswers'); }

  getCategories() {
    this.questionService.getCategories().pipe(
      map((response: Category[]) => {
        const categories = response;
        this.categories = categories.map(x => x.name);
      })
    ).subscribe()
  }

  get answers() {
    return this.questionForm.get('incorrectAnswers') as FormArray;
  }

  newIncorrectAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required]
    })
  }

  addIncorrectAnswer() {
    // this.answers.push(this.fb.group({ answer: ['', Validators.required] }));
    this.answers.push(this.newIncorrectAnswer());
  }

  deleteIncorrectAnswer(index: number) {
    this.answers.removeAt(index);
  }


  addCategory() {
    let category = this.categoryForm.controls['category'].value;

    this.adminService.addCategory(category).subscribe(response => {
      this.toastr.success(response);
      this.categoryForm.reset();
    }, error => {
      this.toastr.error(error.error);
      this.categoryForm.reset();
    })
  }

  addQuestion() {
    let question = this.questionForm.value as CustomQuestion;
    question.incorrectAnswers = [];

    let incorrectAnswers: string[] = [];

    for (let i = 0; i < this.answers.length; i++) {
      let value: string = this.answers.controls[i].value
      value = JSON.stringify(value);

      var newValue = value.replace('{"answer":"', '').slice(0, -2);
      incorrectAnswers.push(newValue);
    }

    question.incorrectAnswers = incorrectAnswers;

    this.adminService.addQuestion(question).subscribe(response => {
      this.toastr.success(response)
      this.questionForm.reset();
    }, () => {
      this.toastr.error('Cannot add question.');
    })
  }
}
