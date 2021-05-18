import { Component, OnInit } from '@angular/core';
import { ProgressbarConfig, ProgressbarType } from 'ngx-bootstrap/progressbar';
import { Question } from '../_models/question';
import { TriviaService } from '../_services/trivia.service';

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 30 });
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class GameComponent implements OnInit {
  timeForAnswer: NodeJS.Timeout;
  endQuiz = false;
  disableButton = false;

  progressBarMaxValue: number = 30;
  progressBarValue: number = 30;
  progressBarType: ProgressbarType = 'success';

  loading = true;
  questions: Question[] = [];
  currentQuestion: Question;
  currentQuestionNumber: number = 0;
  currentAnswers: string[];
  currentCorrectAnswer: string;
  answerColorDisplay: string[] = ['dark', 'dark', 'dark', 'dark']
  

  points: number = 0;

  strange: string = 'Where is the train station &quot;Llanfair&shy;pwllgwyngyll&shy;gogery&shy;chwyrn&shy;drobwll&shy;llan&shy;tysilio&shy;gogo&shy;goch&quot;?'

  constructor(public triviaService: TriviaService) { }

  ngOnInit(): void {
    this.loadQuestions();

    this.timeForAnswer = this.startProgressBar();
  }

  startProgressBar() {
    return setInterval(() => this.changeProgressBarValue(), 1000);
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

  checkAnswer(userAnswer: string, index: number) {
    let answersColor = this.answerColorDisplay;

    if (this.currentCorrectAnswer === userAnswer) {
      answersColor[index] = 'success'
      this.points += this.calculatePoint();
      console.log(this.points);

    } else {
      this.answerColorDisplay[index] = 'danger'
    }

    this.goToNextQuestion();
  }

  calculatePoint(): number {
    let maxTime: number = this.progressBarMaxValue;
    let currentTime: number = this.progressBarValue;

    if (currentTime < maxTime * 0.25) return 1;
    if (currentTime < maxTime * 0.5) return 2;
    return 3;
  }

  changeProgressBarValue(): void {
    let maxValue: number = this.progressBarMaxValue;
    let value: number = this.progressBarValue;
    let currentQuestionNumber = this.currentQuestionNumber;
    let type: string;

    value--;

    if (value === 0) {
      type = 'success';
      this.goToNextQuestion();
    }
    else if (value < maxValue * 0.25) type = 'danger';
    else if (value < maxValue * 0.5) type = 'warning';
    else type = 'success';

    this.progressBarValue = value;
    this.progressBarType = type as ProgressbarType;
  }

  goToNextQuestion() {
    this.disableButton = true;
    this.setTimeoutBeforeQuestion(1000).then(() => {
      if (this.currentQuestionNumber + 1 === this.questions.length) {
        this.endQuiz = true;
        return
      }
      this.resetProgressBarValue()
      this.setDefaultAnswerValidBorders();
      this.currentQuestionNumber++;
      this.setCurrentQuestion(this.currentQuestionNumber);
      this.setCurrentAnswers();
      this.disableButton = false;
    });
  }

  setDefaultAnswerValidBorders() {
    this.answerColorDisplay = ['dark', 'dark', 'dark', 'dark']
  }

  setTimeoutBeforeQuestion(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetProgressBarValue() {
    this.progressBarValue = 30;
  }

}
