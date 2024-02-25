import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../model/Patient';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  Patients!:Patient[]
  @ViewChild('txtName') name!:ElementRef

  constructor(private patientService:PatientService, private router:Router){}
  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.patientService.loadAll().subscribe({
      next:data=>{
        this.Patients=data
      },
      error:err=>{
        console.log("error")
      }
    })
  }

  onSearch(){
    let name= this.name.nativeElement.value
    this.patientService.Search(name).subscribe({
      next:data=>{
        this.Patients=data
      }
    })
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
      
      this.patientService.Delete(id).subscribe({
        next:data=>{
          this.getAll()

          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }  
        }
      })
    }


    });

    
  }

  edit(id:number){
    debugger
    this.router.navigate(['/home/NewPatient'],{queryParams:{Id:id}})
  }

}
