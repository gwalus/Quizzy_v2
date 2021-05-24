import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionDb } from '../_models/questionDb';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-custom-game',
  templateUrl: './custom-game.component.html',
  styleUrls: ['./custom-game.component.css']
})
export class CustomGameComponent implements OnInit {
  currentQuestion: QuestionDb;
  answerColorDisplay: string[] = []
  answerResult: string;
  isAnswered = false;
  answerType: string;
  questionIds: string[] = []

  constructor(private questionService: QuestionService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion() {
    this.resetFields();

    this.questionService.getQuestion().subscribe((response: QuestionDb) => {
      this.currentQuestion = response;

      // let ids = this.questionIds;

      // if(!ids.includes(response.questionId)) {
      //   this.questionIds.push(response.questionId);
      // } else {
        
      // }

      
      console.log(this.questionIds);
    }, () => {
      this.router.navigateByUrl('');
      this.toastr.error('This category does not any questions yet. Please contact with admin!');
    })
  }

  checkAnswer(categoryId: string, userAnswer: string, index: number) {
    this.questionService.checkAnswer(categoryId, userAnswer).subscribe(response => {
      if (response === 'Good answer') {
        this.setAnswerBorders(index, 'success');
        this.answerResult = response;
        this.isAnswered = true;
        this.answerType = 'success';
      } else {
        this.setAnswerBorders(index, 'danger');
        this.answerResult = response;
        this.isAnswered = true;
        this.answerType = 'danger';
      }

    })
  }

  setAnswerBorders(index: number, type: string) {
    let bad = 'primary'

    const count = this.currentQuestion.answers.length;
    let answersBorderType: string[] = [];

    for (let i = 0; i < count; i++) {
      answersBorderType.push(bad);
    }

    answersBorderType[index] = type;

    this.answerColorDisplay = answersBorderType;
  }

  resetFields() {
    this.answerColorDisplay = [];
    this.answerResult = '';
    this.isAnswered = false;
    this.answerType = '';
  }
}
