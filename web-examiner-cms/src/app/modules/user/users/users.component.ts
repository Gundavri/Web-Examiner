import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserGetRes, UserDeleteRes } from 'src/app/shared/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  usersList: UserGetRes[];

  //Subscriptions
  usersGetSub: Subscription;
  userDeleteSub: Subscription;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersGetSub = this.userService.usersGet$().subscribe((res: UserGetRes[]) => {
      this.usersList = res;
    }, err => this.snackbarService.displayError(err));
  }

  onDelete(userId: string) {
    this.userDeleteSub = this.userService.userDelete$(userId).subscribe((res: UserDeleteRes) => {
      this.usersList = this.usersList.filter((user: UserGetRes) => {
        return user._id !== userId;
      })
    }, err => this.snackbarService.displayError(err));
  }


  ngOnDestroy() {
    if (this.usersGetSub) this.usersGetSub.unsubscribe();
  }

}
