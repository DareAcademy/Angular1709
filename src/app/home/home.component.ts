import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menu } from '../data/Menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  limenu!:any[]
  role!:string
  filteredMenu:any[]=[]
  constructor(private router:Router){
    debugger
    this.limenu=menu
    this.role=JSON.parse(JSON.stringify(localStorage.getItem("Roles")))
    this.limenu.forEach((element:any)=>{
      const isInRole=element.roles.find((x:any)=>x==this.role)
      if(isInRole !=undefined){
        this.filteredMenu.push(element)
      }
    })
  }
  logout(){
    this.router.navigate(['/'])
    localStorage.removeItem("Roles")
    localStorage.removeItem("securityInfo")

  }
}
