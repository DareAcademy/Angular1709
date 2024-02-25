import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../model/Patient';
import { PatientService } from '../services/patient.service';
import { CountryService } from '../services/country.service';
import { Country } from '../model/Country';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {
  IsEdit:boolean=false
  PatientForm!:FormGroup;
  countries!:Country[]
  Id!:number
  constructor(private formbuilder:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private patientService:PatientService,
              private countryService:CountryService){}

ngOnInit(): void {
  this.fillCountry()
  if(this.activatedRoute.snapshot.queryParams["Id"] !=undefined){
    this.Id= this.activatedRoute.snapshot.queryParams["Id"]
    this.edit();
    debugger
    this.IsEdit=true

  }

  
  this.PatientForm=  this.formbuilder.group({
    "txtfirstName":['',Validators.required],
    "txtlastName":['',Validators.required],
    "txtdob":['',Validators.required],
    "txtphone":['',Validators.required],
    "rbgender":['',Validators.required],
    "ddlcountry_Id":['',Validators.required],

  })

}

edit(){
  this.patientService.Load(this.Id).subscribe({
    next:data=>{
      debugger
      this.PatientForm.controls['txtfirstName'].setValue(data.firstName)
      this.PatientForm.controls['txtlastName'].setValue(data.lastName)
      this.PatientForm.controls['txtdob'].setValue(this.reformatDate(data.dob))
      this.PatientForm.controls['txtphone'].setValue(data.phone)
      this.PatientForm.controls['rbgender'].setValue(data.gender)
      this.PatientForm.controls['ddlcountry_Id'].setValue(data.country_Id)
    }
  })
}

reformatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

Update(){
  debugger
  if(this.PatientForm.valid==true){
    var newPatient=new Patient();
    newPatient.id=this.Id;
    newPatient.firstName=this.PatientForm.value['txtfirstName']
    newPatient.lastName=this.PatientForm.value['txtlastName']
    newPatient.dob=this.PatientForm.value['txtdob']
    newPatient.phone=this.PatientForm.value['txtphone']
    newPatient.country_Id=parseInt(this.PatientForm.value['ddlcountry_Id'])
    newPatient.gender=this.PatientForm.value['rbgender']

    this.patientService.update(newPatient).subscribe({
      next:data=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Patient has been updated",
          showConfirmButton: false,
          timer: 3000
        });
      }
    })
  }
}

fillCountry(){
this.countryService.loadAll().subscribe({
  next:data=>{
    this.countries=data
  },
  error:err=>{
    console.log("error")
  }
})
}
onSave(){
  if(this.PatientForm.valid==true){
    var newPatient=new Patient();
    newPatient.firstName=this.PatientForm.value['txtfirstName']
    newPatient.lastName=this.PatientForm.value['txtlastName']
    newPatient.phone=this.PatientForm.value['txtphone']
    newPatient.dob=this.PatientForm.value['txtdob']
    newPatient.country_Id=this.PatientForm.value['ddlcountry_Id']
    newPatient.gender=this.PatientForm.value['rbgender']

    this.patientService.Insert(newPatient).subscribe({
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
