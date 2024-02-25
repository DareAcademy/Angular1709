import { Component,OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../model/Country';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.css']
})
export class NewCountryComponent implements OnInit {
  IsEdit:boolean=false
  countryForm!:FormGroup;
  Id!:number
  constructor(private countryService:CountryService,
    private formbuilder:FormBuilder, 
    private activatedRoute:ActivatedRoute,
    private translate:TranslateService){}
  
    ngOnInit(): void {
      debugger
      if(this.activatedRoute.snapshot.queryParams["Id"] !=undefined){
        this.Id= this.activatedRoute.snapshot.queryParams["Id"]
        this.edit();
        this.IsEdit=true

    }

    this.countryForm=  this.formbuilder.group({
        "txtCode":['',Validators.required],
        "txtName":['',Validators.required]
      })
    }

    edit(){
      this.countryService.Load(this.Id).subscribe({
        next:data=>{
          debugger
          this.countryForm.controls['txtCode'].setValue(data.code)
          this.countryForm.controls['txtName'].setValue(data.name)
        }
      })
    }

  Save(){
    debugger
    if(this.countryForm.valid==true){
      var newCountry=new Country();
      newCountry.code=this.countryForm.value['txtCode']
      newCountry.name=this.countryForm.value['txtName']
      this.countryService.Insert(newCountry).subscribe({
        next:data=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: this.translate.instant("NewCountry.sucessMessage"),
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
    }
    
  }

  Update(){
    if(this.countryForm.valid==true){
      var newCountry=new Country();
      newCountry.id=this.Id;
      newCountry.code=this.countryForm.value['txtCode']
      newCountry.name=this.countryForm.value['txtName']

      this.countryService.update(newCountry).subscribe({
        next:data=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Country has been updated",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
    }
  }
}
