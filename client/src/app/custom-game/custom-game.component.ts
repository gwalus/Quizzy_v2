import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionDb } from '../_models/questionDb';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-custom-game',
  templateUrl: './custom-game.component.html',
  styleUrls: ['./custom-game.component.css']
})
export class CustomGameComponent implements OnInit {
  currentQuestion: QuestionDb;


  constructor(private questionService: QuestionService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion() {
    this.questionService.getQuestion().subscribe(response => {
      this.currentQuestion = response as QuestionDb;
      console.log(response);
    }, () => {
      this.router.navigateByUrl('');
      this.toastr.error('This category does not any questions yet. Please contact with admin!');
    })
  }
}
