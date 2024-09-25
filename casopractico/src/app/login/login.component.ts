import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MensajesComponent } from '../mensajes/mensajes.component';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  animations:[
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(700)
      ]),
      transition('* => void', [
        animate(700, style({ opacity: 0 }))
      ])
    ]),
  ],
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{
  password_flag:  Boolean = false
  tipo_input:     string  = 'password'
  formulario:     FormGroup;
  dialog = inject(MatDialog);

  constructor(private fb:FormBuilder, private usuariosService:UsuariosService, private router:Router){
    this.formulario = this.fb.group({
      usuario:     ['', Validators.required],
      contrasenia: ['', Validators.required]
    })
    
  }

  ngOnInit(): void {
  }

  ver_ocultar_contrasenia(){
    this.password_flag = !this.password_flag
    if(this.password_flag){
      this.tipo_input = 'text'
    }else{
      this.tipo_input = 'password'
    }
  }
  validarFormulario(){
    let login = this.usuariosService.login(this.formulario.get('usuario')?.value, this.formulario.get('contrasenia')?.value);
    if (login){
      this.router.navigate(['usuarios']);
    }else{
      const dialog = this.dialog.open(
        MensajesComponent, 
        {
          width: '550px',
          height:'50%',
          panelClass: 'modal',
          disableClose:true,
          data: {
            tipo:'error'
          }
        }) 
    }
   
  }

}
