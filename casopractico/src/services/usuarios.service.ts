import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios:any[] = []
  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get<any>(`https://randomuser.me/api/`);
  }

  guardarUsuario(usuario:any){
    this.usuarios.push(usuario)
    this.guardarClaveStorage('usuarios', JSON.stringify(this.usuarios))
  }

  login(usuario:string, constrasenia:string):Boolean{
    if(usuario == 'Administrador' && constrasenia == 'Admin123'){
      this.guardarClaveStorage('usuario', 'Administrador')
      return true
    } 
    return false
  }

  guardarClaveStorage(clave:string, valor:any) {
    localStorage.setItem(clave,valor);
  }

  eliminarClaveStorage(clave:string){
    localStorage.removeItem(clave);
  }
  obtenerClaveStorage(valor:string){
    return localStorage.getItem(valor);
  }

}
