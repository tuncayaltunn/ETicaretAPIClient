import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper : JwtHelperService, private router : Router, private toastr : CustomToastrService,
    private spinner : NgxSpinnerService
  ) { }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallAtom);

    if(!_isAuthenticated){
      this.router.navigate(["login"],{ queryParams : { returnUrl : state.url }});
      this.toastr.message("Oturum açmanız gerekiyor", "Yetkisiz Erişim!", {
        messageType : ToastrMessageType.Warning,
        position : ToastrPosition.TopRight
      })
    }

    this.spinner.hide(SpinnerType.BallAtom);
    return true;
  }  
}
