import { Country } from "./Country"

export class Patient{
    id!:number
    firstName!:string
    lastName!:string
    dob!:Date
    phone!:string
    gender!:string
    country_Id!:number
    country !:Country

}