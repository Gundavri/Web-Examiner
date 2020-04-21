import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserService } from 'src/app/core/services/user.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogService } from 'src/app/core/services/dialog.service';

const routes: Routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [
    UserService,
    DialogService
  ]
})
export class UserModule { }
