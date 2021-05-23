import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GameOptionsComponent } from '../game-options/game-options.component';
import { Category } from '../_models/category';
import { QuestionService } from '../_services/question.service';
import { TriviaService } from '../_services/trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  categoriesFromDatabase: string[] = [];
  colorTypes: string[] = [
    'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'
  ];
  randomTypes: string[] = [];
  choosedCategory?: string;
  loading = false;

  bsModalRef: BsModalRef;

  constructor(private triviaService: TriviaService, private toastr: ToastrService, private modalService: BsModalService,
    private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadCategoriesFromDatabase();
    this.createRandomColorsTable();
  }

  loadCategories() {
    this.loading = true;
    this.triviaService.getCategories().subscribe(response => {
      this.categories = response as Category[];
      this.loading = !this.loading;
    });
  }

  loadCategoriesFromDatabase() {
    this.questionService.getCategories().subscribe(response => {
      this.categoriesFromDatabase = response as string[];
      this.loading = !this.loading;
    })
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

      const initialState = {
        id: `${category.id}`,
        category: `${category.name}`,
      };
      this.bsModalRef = this.modalService.show(GameOptionsComponent, { initialState });
    }
    else this.toastr.error('You have not selected any category.');
  }
}
