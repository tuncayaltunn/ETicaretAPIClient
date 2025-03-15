import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

declare var $ : any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';

  @ViewChild(DynamicLoadComponentDirective, { static : true })
  dynamicLoadComponentDirective : DynamicLoadComponentDirective;

  constructor(public authService : AuthService, private toastr : CustomToastrService, private router : Router 
    ,private dynamicLoadComponentService : DynamicLoadComponentService
  ) { 
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

  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent,
                                                    this.dynamicLoadComponentDirective.viewContainerRef);
  }
}

