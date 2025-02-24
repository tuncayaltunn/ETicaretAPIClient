import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService : HttpClientService, private toastr : CustomToastrService) { }

  async login(usernameOrEmail : string, password : string, callBackFunction? : () => void ) : Promise<void> {
    const observable : Observable<any> = this.httpClientService.post<any | TokenResponse>({
      action : "login",
      controller : "auth"
    },{
      usernameOrEmail, password
    });

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastr.message("Kullanıcı girişi başarıyla sağlanmıştır","Giriş Başarılı", {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
    }

    callBackFunction(); 
  }

  async refreshTokenLogin(refreshToken : string, callBackFunction? : () => void ) : Promise<any> {
    const observable : Observable<any | TokenResponse> = this.httpClientService.post({
      action : "refreshtokenlogin",
      controller : "auth"
    }, { refreshToken : refreshToken });

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    }
    callBackFunction();
  }

}
