import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question, Quiz } from '../model.quiz';
import { QuizService } from '../quiz.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit {
  quizId: string;
  allQuizzes: Quiz[];
  currentQuiz: Quiz;
  currentQuestionId:number;
  currentQuestion:Question;
  start:boolean;
  choice:number;
  total:number;
  finish:boolean;
  result:string;
  constructor(private service:QuizService, private route: ActivatedRoute) { }

  initQuiz(): void {
    this.result="";
    this.finish = false;
    this.total = 0;
    this.currentQuestionId = -1;
    this.start = false;
    this.allQuizzes = [new Quiz(-1, "N/A", [new Question("N/A", ["aa", "bb", "cc", "dd"], 0)])]
    this.route.params.subscribe((params: Params) => {this.quizId = params['quizId']});
    this.service.loadQuiz().subscribe(data=>{this.allQuizzes=data},()=>{});

  }
  ngOnInit(): void {
    this.subscribeRouteChange();
    this.initQuiz();
  }

  getResult() {
    // Calculate the final result
    this.result = `You scored ${((this.total / this.currentQuiz.questions.length) * 100)}%.`;
    this.finish = true;
  }

  submit() {
    let confirmed = confirm("Are you ready to submit?")
    if (confirmed) {
      if (this.choice == this.currentQuestion.answer) {
        this.total += 1;
      }
      this.getResult();
    }
    
  }

  getQuestion() {
    
    if (this.choice == this.currentQuestion.answer) {
      this.total += 1;
    }

    if (this.currentQuestionId >= this.currentQuiz.questions.length - 1) {
      this.submit();
      return
    }
    
    if(this.currentQuestionId != -1) {
      console.log(`${this.currentQuestion.answer} answered - ${this.choice}`);
    }
    this.currentQuestionId += 1;
    this.currentQuestion = this.currentQuiz.questions[this.currentQuestionId];

    this.choice = null;
  }
  getStarted() {
    document.getElementById("startQuizDisplay").style.display="none"
    this.start = true;
    this.currentQuiz = this.allQuizzes[this.quizId]
    this.currentQuestionId=0;
    this.currentQuestion = this.currentQuiz.questions[this.currentQuestionId];    
  }

  // For route changes
  subscribeRouteChange() {
    this.route.params.subscribe((params = {}) => {
        console.log("route changed");
        this.initQuiz();
    });
}
}