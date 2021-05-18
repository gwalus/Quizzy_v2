import { Component, OnInit } from '@angular/core';
import { Question } from '../_models/question';
import { TriviaService } from '../_services/trivia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  loading = true;
  questions: Question[] = [];
  currentQuestion: Question;
  currentQuestionNumber: number = 0;
  currentAnswers: string[];
  currentCorrectAnswer: string;

  strange: string = 'Where is the train station &quot;Llanfair&shy;pwllgwyngyll&shy;gogery&shy;chwyrn&shy;drobwll&shy;llan&shy;tysilio&shy;gogo&shy;goch&quot;?'

  constructor(public triviaService: TriviaService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.triviaService.getQuestions().subscribe(
      questions => {
        this.questions = questions
        let currentQuestionNumber = 0;

        this.setCurrentQuestion(currentQuestionNumber)
        this.setCurrentAnswers()
        this.loading = false;
      },
      error => console.log(error.error)
    );
  }

  setCurrentQuestion(questionNumber: number) {
    this.currentQuestion = this.questions[questionNumber];
  }

  setCurrentAnswers() {
    let question = this.currentQuestion;
    console.log(question)

    let answers = question.incorrect_answers;
    answers.push(question.correct_answer)
    console.log(answers);

    answers = this.shuffleAnswers(answers)

    this.currentCorrectAnswer = question.correct_answer;
    console.log(this.currentCorrectAnswer)
    this.currentAnswers = answers;
  }

  shuffleAnswers(array: string[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
