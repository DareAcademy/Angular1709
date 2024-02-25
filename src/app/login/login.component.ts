import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { SignIn } from '../model/SignIn';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserForm !:FormGroup;
  @ViewChild('ddlLanguage') Language!:ElementRef
  constructor(private formbuilder:FormBuilder,
            private accountService:AccountService,
            private router:Router,
            private translate:TranslateService){}

  ngOnInit(): void {
    this.UserForm=  this.formbuilder.group({
      "txtUsername":['',Validators.required],
      "txtPassword":['',Validators.required]
     
    })
  }


  Login(){
    if(this.UserForm.valid){
      var user=new SignIn()
      user.username=this.UserForm.value["txtUsername"]
      user.password=this.UserForm.value["txtPassword"]

      this.accountService.Login(user).subscribe({
        next:data=>{
          debugger
          localStorage.setItem("securityInfo",data.token)
          this.accountService.GetUserRoles(this.UserForm.value["txtUsername"]).subscribe({
            next:data=>{
              debugger
              localStorage.setItem("Roles",data)
              this.router.navigate(['/home/PatientList'])

            },
            error:err=>console.log(err)
          })
        },
        error:err=>{
          console.log("error")
        }
      })
    }
  }

  changeLanguage(){
    debugger
    this.translate.use(this.Language.nativeElement.value)
    if(this.Language.nativeElement.value=='ar'){
      document.getElementsByTagName("body")[0].dir="rtl"
    }
    else
    {
      document.getElementsByTagName("body")[0].dir="ltr"
    }

  }
}
