import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css']
})
export class GameOptionsComponent implements OnInit {
  title: string;
  id: string;
  category: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
