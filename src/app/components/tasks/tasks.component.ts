import { Component, OnInit } from '@angular/core';
import { tasks } from '../../mock-tasks';
import { Task } from '../../Types/Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  Tasks: Task[] = [];

  // in the constructor we invoke the services defining data pulling and other services
  constructor(private taskService: TaskService) {}

  // A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive
  // .subscribe() is like .then() of react fetch api. Consequetive operation
  ngOnInit(): void {
    // async operation.... having an observer at service
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.Tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    this.taskService
      .taskDelete(task)
      .subscribe(
        () => (this.Tasks = this.Tasks.filter((tsk) => tsk.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.toggleTaskReminder(task).subscribe();
  }

  addNewTask(taskk: Task) {
    this.taskService.newTaskAdd(taskk).subscribe((task) => {
      this.Tasks.push(task);
    });
  }
}
