import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserGetRes } from 'src/app/shared/models/user';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @Input() singleUser: UserGetRes;
  @Output() deleteUser = new EventEmitter<string>();

  // Subscriptions
  confirmDialogSub: Subscription;

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }


  onDelete() {
    this.confirmDialogSub = this.dialogService.openConfirmDialog().subscribe((res: boolean) => {
      if (res) {
        this.deleteUser.emit(this.singleUser._id);
      }
    });
  }

  ngOnDestroy() {
    if (this.confirmDialogSub) this.confirmDialogSub.unsubscribe();
  }

}
