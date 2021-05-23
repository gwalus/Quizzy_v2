import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GameOptionsComponent } from '../game-options/game-options.component';
import { Category } from '../_models/category';
import { Question } from '../_models/question';
import { QuestionService } from '../_services/question.service';
import { TriviaService } from '../_services/trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  categoriesFromDatabase: Category[] = [];
  colorTypes: string[] = [
    'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'
  ];
  randomTypes: string[] = [];
  choosedCategory?: string;
  choosedCategoryFromDatabase?: string;
  loading = false;

  questionFromDatabase: Question;

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
    });
  }

  loadCategoriesFromDatabase() {
    this.questionService.getCategories().subscribe(response => {
      this.categoriesFromDatabase = response as Category[];
      this.loading = false;
    })
  }

  getRandomBtnColor(num: number) {
    return this.randomTypes[num];
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

  chooseCategoryFromDatabase(categoryId: string) {
    this.choosedCategoryFromDatabase = categoryId;
    console.log(this.choosedCategoryFromDatabase);
  }

  startWithCustomCategory() {
    if (this.choosedCategoryFromDatabase) {
      this.questionService.getQuestion(this.choosedCategoryFromDatabase).subscribe(response => {
        this.questionFromDatabase = response
      }
      )
    }
    else this.toastr.error('You have not selected any category.');
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
