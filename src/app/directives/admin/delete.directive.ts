import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  readonly dialog = inject(MatDialog);

  constructor(
    private element : ElementRef, 
    private _renderer : Renderer2, 
    private httpClientService : HttpClientService,
    private spinner : NgxSpinnerService,
    private alertifyService : AlertifyService
  ) 
  { 
    const img = _renderer.createElement("img");
    img.setAttribute("src","../../../../../assets/delete.png");
    img.setAttribute("style","cursor: pointer");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);

  }

  @Input() id : string;
  @Input() controller : string;

  @Output() callback : EventEmitter<any> = new EventEmitter<any>();

  @HostListener("click")
  async onclick(){
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom)
      const td : HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: "0",
          left: "+=55",
          height: "toggle" 
        }, 700, () => {
          this.callback.emit()
          this.alertifyService.message("Ürün başarıyla silinmiştir",{
            dismissOthers : true,
            messageType : MessageType.Success,
            position : Position.TopRight
          })
        });
      }, (errorResponse : HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.BallAtom)
        this.alertifyService.message("Ürün silinirken beklenmeyen bir hata ile karşılaşılmmıştır",{
          dismissOthers : true,
          messageType : MessageType.Error,
          position : Position.TopRight
        })
      })
      
    });
  }


  openDialog(afterClosed : any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
         afterClosed();
      }
    });
  }

}
