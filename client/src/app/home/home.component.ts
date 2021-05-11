import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { TriviaService } from '../_services/trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = []

  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.triviaService.getCategories().subscribe(response => {
      this.categories = response as Category[];
    }
    )
  }
}
