import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GameOptionsComponent } from '../game-options/game-options.component';
import { Category } from '../_models/category';
import { TriviaService } from '../_services/trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  colorTypes: string[] = [
    'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'
  ];
  randomTypes: string[] = [];
  choosedCategory?: string;

  bsModalRef: BsModalRef;

  constructor(private triviaService: TriviaService, private toastr: ToastrService, private router: Router, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.loadCategories();
    this.createRandomColorsTable();
  }

  loadCategories() {
    this.triviaService.getCategories().subscribe(response => {
      this.categories = response as Category[];
    });
  }

  getRandomBtnColor(num: string) {
    let temp = Number.parseInt(num);
    temp -= 9;
    return this.randomTypes[temp];
  }

  createRandomColorsTable() {
    let table: string[] = [];

    for (let i = 0; i < 24; i++) {
      let randomColor = this.colorTypes[Math.floor(Math.random() * this.colorTypes.length)];
      table.push(randomColor);
    }
    this.randomTypes = table;
  }

  chooseCategory(categoryId: string) {
    this.choosedCategory = categoryId;
  }

  openModalWithGameOptions() {
    if (this.choosedCategory) {
      let category = this.categories.filter(x => x.id === this.choosedCategory)[0];

      console.log(category);
      const initialState = {
        title: 'Game options',
        id: `${category.id}`,
        category: `${category.name}`,
      };
      this.bsModalRef = this.modalService.show(GameOptionsComponent, { initialState });
    }
    else this.toastr.error('You have not selected any category.');
  }
}
