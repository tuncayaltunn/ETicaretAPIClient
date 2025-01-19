import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { concatMap, firstValueFrom, lastValueFrom, map, Observable, observable, toArray } from 'rxjs';
import { StickyDirection } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService) { }

  create(product: Create_Product, successCallBack? : () => void, errorCallBack? : (errorMessage : string) => void){
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack()
    }, (errorResponse : HttpErrorResponse) => {
      const _error : Array<{key : string, value : Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((v,index) => {
        v.value.forEach((_v,_index) => {
          message += `${_v}<br>`;
        })
      })
      errorCallBack(message);
    })
  }

  async read(page : number, size : number, successCallBack? : () => void, 
  errorCallBack? : (errorMessage : string) => void) : Promise<{totalCount : number, products : List_Product[]}>{

    // const promiseData : Promise<[totalCount : number, products : List_Product[]]> = 
    //   this.httpClientService.get<[totalCount : number, products : List_Product[]]>({
    //   controller: "products"
    // }).toPromise();

    const promiseData : Promise<{totalCount : number, products : List_Product[]}> = lastValueFrom(
      this.httpClientService.get<{totalCount : number, products : List_Product[]}>({
          controller: "products",
          queryString : `page=${page}&size=${size}`
    }).pipe(

      // map(response => {
      //   // Eğer API cevabında doğru sıralama varsa, direkt olarak döndürmek
      //   //const [totalCount, products] = response;
      //   return response; //{ totalCount, products };
      // })

      //concatMap(productsArray => productsArray),  // Her bir Product[] öğesini tek tek açıyoruz
      //toArray()  // Tüm öğeleri birleştiriyoruz
    ));

    promiseData
        .then(d => successCallBack())
        .catch( (errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message) );

    return await promiseData;

  }

  async delete(id : string){
    const deleteObservable : Observable<any> = this.httpClientService.delete<any>({
      controller : "products"
    }, id)

    await firstValueFrom(deleteObservable)
  }

}
