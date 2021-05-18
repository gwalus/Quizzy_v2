import { Component, OnInit } from '@angular/core';
import { Question } from '../_models/question';
import { TriviaService } from '../_services/trivia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  questions: Question[];
  currentQuestion: Question;

  strange: string = 'Where is the train station &quot;Llanfair&shy;pwllgwyngyll&shy;gogery&shy;chwyrn&shy;drobwll&shy;llan&shy;tysilio&shy;gogo&shy;goch&quot;?'

  constructor(public triviaService: TriviaService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.triviaService.getQuestions().subscribe(
      questions => {
        this.questions = questions
        console.log(questions);
      },
      error => console.log(error.error)
    )
  }

}
