import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarItem } from 'src/app/shared/models/sidebar-item';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  sidebarItems: SidebarItem[] = [
    {
      name: 'Users',
      icon: 'person_outline',
      link: '/admin/users'
    },
    {
      name: 'Exams',
      icon: 'view_module',
      link: '/admin/exams'
    },
    {
      name: 'Questions',
      icon: 'short_text',
      link: '/admin/questions'
    },
    {
      name: 'Written Exams',
      icon: 'folder',
      link: '/admin/written-exams'
    },
    {
      name: 'Logout',
      icon: 'keyboard_tab',
      link: '/admin/login'
    }
  ];


  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
