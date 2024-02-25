import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Users } from '../model/Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  liUsers!:Users[]
  constructor(private accountService:AccountService,private router:Router){}
  
  ngOnInit(): void {
      this.accountService.getUsers().subscribe({
        next:data=>{
          this.liUsers=data
        },
        error:err=>{
          console.log("error")
        }
      })
  }

  onGetUserRole(userId:string){
    this.router.navigate(['/home/userRoles'],{queryParams:{Id:userId}})
  }

  }
