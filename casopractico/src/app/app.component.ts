import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers:[UsuariosService],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(public router:Router, private usuariosService:UsuariosService){}
  ngOnInit(): void {
    if(this.usuariosService.obtenerClaveStorage('usuario')!=null){
      this.router.navigate(['usuarios']);
    }else{
      this.router.navigate(['']);
    }
   
  }


}
