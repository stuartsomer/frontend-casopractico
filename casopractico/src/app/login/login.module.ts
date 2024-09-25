import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../../services/usuarios.service';
import { MensajesComponent } from '../mensajes/mensajes.component';


@NgModule({
  declarations: [LoginComponent, MensajesComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],providers:[UsuariosService]
})
export class LoginModule { }
