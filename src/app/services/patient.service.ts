import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../model/Patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient:HttpClient) { }

  Insert(patient:Patient):Observable<any>{
    debugger
    return this.httpClient.post("http://localhost/ClinicAPI1709/api/Patients",patient)
  }

  loadAll():Observable<any>{
    return this.httpClient.get('http://localhost/ClinicAPI1709/api/Patients/LoadAll')
  }

  Search(name:string):Observable<any>{
    return this.httpClient.get('http://localhost/ClinicAPI1709/api/Patients/Search?Name='+name)
  }


  Delete(id:number):Observable<any>{
    debugger
    return this.httpClient.delete('http://localhost/ClinicAPI1709/api/Patients?Id='+id)
  }

  Load(id:number):Observable<any>{
   return this.httpClient.get('http://localhost/ClinicAPI1709/api/Patients/Load?Id='+id)
  }

  update(patient:Patient):Observable<any>{
    return this.httpClient.put('http://localhost/ClinicAPI1709/api/Patients',patient)
  }
}
