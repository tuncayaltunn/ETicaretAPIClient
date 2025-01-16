import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private httpClientService : HttpClientService) { 
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    // this.httpClientService.get<Product[]>({
    //   controller : "products"
    // }).subscribe(data => console.log(data))

    // this.httpClientService.delete({
    //   controller: "products"
    // }, "972b9805-3894-4c0d-bd1c-01e5866a9ccf").subscribe()

    // this.httpClientService.put({
    //   controller : "products"
    // },{
    //   id : "01a6548b-1c18-418f-9957-a69ca2fc18a2",
    //   name : "Renkli Kağıt",
    //   stock : 1500,
    //   price : 5.5
    // }).subscribe()

    // this.httpClientService.post({
    //   controller : "products"
    // }, {
    //   name : "Kalem",
    //   stock : 100,
    //   price : 15
    // }).subscribe();

  }

}
