import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  choosedCategory?: string;

  constructor(private triviaService: TriviaService, private toastr: ToastrService, private router: Router) {
    this.loadCategories();
  }

  ngOnInit(): void {

  }

  loadCategories() {
    this.triviaService.getCategories().subscribe(response => {
      this.categories = response as Category[];
    });
  }

  getRandomBtnColor() {
    return this.colorTypes[Math.floor(Math.random() * this.colorTypes.length)];
  }

  chooseCategory(categoryId: string) {
    this.choosedCategory = categoryId;
  }

  StartQuiz() {
    if (this.choosedCategory)
      this.router.navigateByUrl('game');
    else this.toastr.error('You have not selected any category.');
  }
}
