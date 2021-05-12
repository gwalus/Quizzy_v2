import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(public bsModalRef: BsModalRef, private triviaService: TriviaService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.triviaService.getNumbersOfQuestionsCategory(this.id).subscribe(response => {
      this.numbersOfQuestions = response;
    })

    this.optionsModel = this.formBuilder.group({
      id: this.id,
      level: this.difficulty[0],
      numberOfQuestions: this.numberOfQuestions[1]
    })
  }

  play() {
    console.log(this.optionsModel.value);

    let id = this.optionsModel.controls['id'].value;
    let level = this.optionsModel.controls['level'].value;
    let numberOfQuestions = this.optionsModel.controls['numberOfQuestions'].value;

    this.triviaService.getQuestions(id, level, numberOfQuestions).subscribe(
      () => {
        this.bsModalRef.hide();
        this.router.navigateByUrl('game');
      },
      () => {
        console.log('Something went wrong')
      }
    );
  }

}
