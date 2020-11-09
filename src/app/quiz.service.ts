import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from './model.quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient:HttpClient) { }

  loadQuiz():Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>("http://localhost:3000/quizzes")
  }
  
}