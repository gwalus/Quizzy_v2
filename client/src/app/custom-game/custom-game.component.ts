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

  constructor(private questionService: QuestionService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion() {
    this.questionService.getQuestion().subscribe(response => {
      this.currentQuestion = response as QuestionDb;
    }, () => {
      this.router.navigateByUrl('');
      this.toastr.error('This category does not any questions yet. Please contact with admin!');
    })
  }

  checkAnswer(categoryId: string, userAnswer: string, index: number) {
    this.questionService.checkAnswer(categoryId, userAnswer).subscribe(response => {
      if (response === 'Good answer') {
        this.setAnswerBorders(index, 'success');
      } else {
        this.setAnswerBorders(index, 'danger');
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
}
