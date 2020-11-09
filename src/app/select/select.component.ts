import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../model.quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {

  // Holds all the quizzes in an array
  allQuizzes: Quiz[];

  constructor(private service:QuizService, private router:Router) {
    this.service.loadQuiz().subscribe(data=>{this.allQuizzes=data},()=>{});
  }

  ngOnInit(): void {
  }
  
  // Call this function to navigate different quizzes
  changeQuiz(quizId) {
    if (quizId == "") {
      this.router.navigate(['/select']);
    } else {
      this.router.navigate([`/quiz`, {"quizId":quizId}]);
    }
  }
}
