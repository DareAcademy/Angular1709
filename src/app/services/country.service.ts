import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../model/Country';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  
  baseUrl=''
  constructor(private httpClient:HttpClient) {
    this.baseUrl=environment.APIUrl
   }

  Insert(country:Country):Observable<any>{
    debugger
    return this.httpClient.post(this.baseUrl+"/api/Country",country)
  }

  loadAll():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/api/Country/LoadAll')
  }

  Delete(id:number):Observable<any>{
    debugger
    return this.httpClient.delete(this.baseUrl+'/api/Country?Id='+id)
  }

  Load(id:number):Observable<any>{
   return this.httpClient.get(this.baseUrl+'/api/Country/Load?Id='+id)
  }

  update(country:Country):Observable<any>{
    return this.httpClient.put(this.baseUrl+'/api/Country',country)
  }
}
