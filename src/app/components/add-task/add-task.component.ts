import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Types/Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  text?: string;
  day?: string;
  reminder: boolean = false;
  @Output()
  onAddTask: EventEmitter<Task> = new EventEmitter();
  showAddTask?: boolean;
  subScription?: Subscription;
  constructor(private uiService: UiService) {
    this.subScription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    console.log(this.showAddTask);
  }

  onSubmit() {
    if (!this.text || !this.day) {
      alert('Add a Task!');
      return;
    }
    const newTask = {
      task: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.day = '';
    this.text = '';
    this.reminder = false;
  }
}
