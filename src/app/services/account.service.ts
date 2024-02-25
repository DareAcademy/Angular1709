import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../model/SignUp';
import { Observable } from 'rxjs';
import { SignIn } from '../model/SignIn';
import { Role } from '../model/Role';
import { UserRoles } from '../model/UserRoles';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl=''
  constructor(private httpClient:HttpClient) {
    this.baseUrl=environment.APIUrl
   }

  createAccount(user:SignUp):Observable<any>{
   return this.httpClient.post(this.baseUrl+'/api/Accounts/Singup',user)

  }

  Login(user:SignIn):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/Accounts/Login',user)
 
   }

   AddRole(role:Role):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/Accounts/AddRole',role)
 
   }
   
   getUsers():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/api/Accounts/UserList')
 
   }

   UserRoles(userId:string):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/api/Accounts/UserRoles?UserId='+userId)
  }
  UpdateRole(userRoles:UserRoles[]):Observable<any>{
    return this.httpClient.post(this.baseUrl+"/api/Accounts/UpdateRole",userRoles)
  }

  GetUserRoles(username:string):Observable<any>{
    return this.httpClient.get(this.baseUrl+`/api/Accounts/GetUserRoles?username=${username}`)
  }
}
