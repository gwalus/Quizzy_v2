import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../_services/trivia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {

  }

}
