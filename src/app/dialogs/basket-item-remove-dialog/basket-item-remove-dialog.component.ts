import { Component, inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> {
    
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(dialogRef : MatDialogRef<BasketItemRemoveDialogComponent>) { super(dialogRef) }

  

}

export enum BasketItemDeleteState{
  Yes,
  No
}