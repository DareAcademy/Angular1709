import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Role } from '../model/Role';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit {
  
  RoleForm !:FormGroup;
  constructor(private formbuilder:FormBuilder,private accountService:AccountService){}

  ngOnInit(): void {
    this.RoleForm=  this.formbuilder.group({
      "txtName":['',Validators.required]
    })
  }
  Save(){

    if(this.RoleForm.valid==true){
      var role=new Role()
      role.name=this.RoleForm.value['txtName']
      this.accountService.AddRole(role).subscribe({
        next:data=>{console.log("success")},
        error:err=>{
          console.log("error")
        }
      })

    }

  }
}
