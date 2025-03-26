import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-shopping-complete-dialog',
  templateUrl: './shopping-complete-dialog.component.html',
  styleUrls: ['./shopping-complete-dialog.component.scss']
})
export class ShoppingCompleteDialogComponent extends BaseDialog<ShoppingCompleteDialogComponent> {

  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(dialogRef : MatDialogRef<ShoppingCompleteDialogComponent>) { super(dialogRef) }

}

export enum ShoppingCompleteState{
  Yes,
  No
}