import { Component, OnInit } from '@angular/core';
import { QuestionDb } from '../_models/questionDb';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-custom-game',
  templateUrl: './custom-game.component.html',
  styleUrls: ['./custom-game.component.css']
})
export class CustomGameComponent implements OnInit {
  currentQuestion: QuestionDb;


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion() {
    this.questionService.getQuestion().subscribe(response => {
      this.currentQuestion = response as QuestionDb;
      console.log(response);
    })
  }
}
