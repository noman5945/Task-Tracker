import { Injectable } from '@angular/core';
import { Task } from '../Types/Task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiURL = 'http://localhost:5000/tasks';
  constructor(private http: HttpClient) {}

  // Search----> "observable" and "of" of 'rxjs'
  // check app.config.ts to understand how Http Module is added
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURL);
  }

  taskDelete(task: Task): Observable<Task> {
    const delete_api = `${this.apiURL}/${task.id}`;
    return this.http.delete<Task>(delete_api);
  }

  toggleTaskReminder(task: Task): Observable<Task> {
    const update_api = `${this.apiURL}/${task.id}`;
    return this.http.put<Task>(update_api, task, httpOptions);
  }

  newTaskAdd(task: Task) {
    return this.http.post<Task>(this.apiURL, task, httpOptions);
  }
}
