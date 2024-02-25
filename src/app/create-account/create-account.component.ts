import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUp } from '../model/SignUp';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  UserForm !:FormGroup;
  constructor(private formbuilder:FormBuilder,private accountService:AccountService){}

  ngOnInit(): void {
        this.UserForm=  this.formbuilder.group({
        "txtName":['',Validators.required],
        "txtEmail":['',Validators.required],
        "rbGender":['',Validators.required],
        "txtPassword":['',Validators.required],
        "txtConfirmPassword":['',Validators.required]
      })
  }

  createAccount(){
    debugger
    if(this.UserForm.valid==true){
      var newUser=new SignUp();
      newUser.name=this.UserForm.value['txtName']
      newUser.email=this.UserForm.value['txtEmail']
      newUser.gender=this.UserForm.value['rbGender']
      newUser.password=this.UserForm.value['txtPassword']
      newUser.confirmPassword=this.UserForm.value['txtConfirmPassword']

      this.accountService.createAccount(newUser).subscribe({
        next:data=>{
          console.log("success")
        },
        error:err=>{
          console.log("error")
        }
      })
    }
  }
}
