import { Component, OnInit } from '@angular/core';
import { UserRoles } from '../model/UserRoles';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  userId!:string
  userRoles!:UserRoles[]
  constructor(private activatedRoute:ActivatedRoute,
              private accountService:AccountService){}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams["Id"] !=undefined){
      this.userId=this.activatedRoute.snapshot.queryParams["Id"]
      this.loadRoles()
    }
  }

  loadRoles(){
    this.accountService.UserRoles(this.userId).subscribe({
      next:data=>{
        this.userRoles=data
      },
      error:err=>console.log(err)
    })  
  }

  onUpdate(userRoles:UserRoles[]){
    this.accountService.UpdateRole(userRoles).subscribe({
      next:data=>{
        console.log("success")
      },
      error:err=>{
        console.log("error happned")
      }
    })
  }
}
