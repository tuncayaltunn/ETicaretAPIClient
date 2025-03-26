import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent> {
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(dialogRef : MatDialogRef<DeleteDialogComponent>) {
    super(dialogRef);    
  }
}

export enum DeleteState{
  Yes,
  No
}