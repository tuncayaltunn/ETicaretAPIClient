import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService, private toastr : CustomToastrService) { }
  
  async create(user : User) : Promise<Create_User> {
    const observable : Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      action : "",
      controller : "users"
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail : string, password : string, callBackFunction? : () => void ) : Promise<void> {
    const observable : Observable<any> = this.httpClientService.post<any | TokenResponse>({
      action : "login",
      controller : "users"
    },{
      usernameOrEmail, password
    });

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken)
      this.toastr.message("Kullanıcı girişi başarıyla sağlanmıştır","Giriş Başarılı", {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
    }

    callBackFunction(); 
  }

}
