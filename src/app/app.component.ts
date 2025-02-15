import { Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';

declare var $ : any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';

  constructor(public authService : AuthService, private toastr : CustomToastrService, private router : Router ) { 
    authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastr.message("Oturum kapatılmıştır","Oturum kapatıldı", {
      messageType : ToastrMessageType.Warning,
      position : ToastrPosition.TopRight
    })
  }
}

