import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../../services/usuarios.service';
import { DetallesComponent } from './detalles/detalles.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [HomeComponent, DetallesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[UsuariosService]
})
export class HomeModule { }
