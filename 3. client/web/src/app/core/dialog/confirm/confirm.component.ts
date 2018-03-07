/**
 * Date : 2017. 12. 07.
 * Create : Dong Gyu
 * Message : 필요한 기능은 수렴후 함수 추가 예정.
 */
import {Component, OnInit, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class AppDialogConfirmComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
  }
}
