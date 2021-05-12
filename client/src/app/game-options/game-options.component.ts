import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NumbersOfQuestions } from '../_models/numbersOfQuestions';
import { TriviaService } from '../_services/trivia.service';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css']
})
export class GameOptionsComponent implements OnInit {
  id: string;
  category: string;
  numbersOfQuestions: NumbersOfQuestions;

  difficulty = [
    'Easy', 'Medium', 'Hard'
  ]

  numberOfQuestions = [
    5, 10, 15
  ]

  optionsModel: FormGroup;

  constructor(public bsModalRef: BsModalRef, private triviaService: TriviaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.triviaService.getNumbersOfQuestionsCategory(this.id).subscribe(response => {
      this.numbersOfQuestions = response;
    })

    this.optionsModel = this.formBuilder.group({
      level: this.difficulty[0],
      numberOfQuestions: this.numberOfQuestions[1]
    })
  }

  play() {
    console.log(this.optionsModel.value);
  }

}
