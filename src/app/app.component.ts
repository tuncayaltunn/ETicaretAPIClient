import { Component } from '@angular/core';



declare var $ : any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';

  constructor() { 

  }
}
$.get("https://localhost:7285/api/products/corstest", (data) => {
  console.log(data);
})
