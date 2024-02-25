import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { Country } from '../model/Country';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries!:Country[]
  constructor(private countryService:CountryService, private router:Router){}
  ngOnInit(): void {
    this.getAll()
  }

  delete(id:number){
    debugger
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {

      if(result.isConfirmed){
      
      this.countryService.Delete(id).subscribe({
        next:data=>{
          this.getAll()

          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }  
        },
        error:err=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "something went wrong!",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
    }


    });

    
  }

  edit(id:number){
    this.router.navigate(['/home/NewCountry'],{queryParams:{Id:id}})
  }

  getAll(){
    this.countryService.loadAll().subscribe({
      next:data=>{
        this.countries=data
      },
      error:err=>{
        console.log("error")
      }
    })
  }

}
