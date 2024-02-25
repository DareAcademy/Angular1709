import { CanActivateFn } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  
  const token=localStorage.getItem("securityInfo")
  if(token){
    return true;
  }else
  {
    return false;
  }
};
