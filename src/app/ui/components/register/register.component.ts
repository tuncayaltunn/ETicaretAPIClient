import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }

  frm : FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adSoyad : ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      kullaniciAdi : ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      email : ["", [Validators.required, Validators.maxLength(250), Validators.email]],
      sifre : ["" , [Validators.required]],
      sifreTekrar : ["", [Validators.required]]
    })
  }

  submitted : boolean = false;

  get component() {
    return this.frm.controls;
  }

  onSubmit(data : User){
    this.submitted = true;
    if(this.frm.invalid){
      return;
    }
  }

}
