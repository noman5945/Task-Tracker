import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title: string = 'Task Tracker';
  showAddTask?: boolean;
  subScription?: Subscription;

  constructor(private uiService: UiService, private router: Router) {
    this.subScription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  btnAddTask() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
