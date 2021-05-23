import { ArrayType } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomQuestion } from '../_models/customQuestion';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  categoryForm: FormGroup;
  questionForm: FormGroup;
  question: CustomQuestion = new CustomQuestion();

  constructor(private fb: FormBuilder, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.questionForm = this.fb.group({
      name: [],
      question: [],
      correctAnswer: [],
      incorrectAnswers: this.fb.array([this.fb.group({ answer: '' })])
    });

  }

  get answers() {
    return this.questionForm.get('incorrectAnswers') as FormArray;
  }

  addIncorrectAnswer() {
    this.answers.push(this.fb.group({ answer: '' }));
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

    this.adminService.addQuestion(question).subscribe((res) => {
      this.toastr.success('Added')
      console.log(res);
    }, error => {
      this.toastr.error('Error');
      console.log(error);
    })
  }
}
