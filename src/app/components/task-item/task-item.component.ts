import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Types/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input()
  task?: Task;
  @Output()
  btnOnDelete: EventEmitter<Task> = new EventEmitter();
  @Output()
  dblClick: EventEmitter<Task> = new EventEmitter();

  FaTimes = faTimes;

  // make sure these parameters are optional as there are async datas
  onDelete(taskk?: Task) {
    this.btnOnDelete.emit(taskk);
  }

  onDoubleClick(taskk?: Task) {
    this.dblClick.emit(taskk);
  }
}
