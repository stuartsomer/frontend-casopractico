import { Component, inject, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-detalles',

  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent implements OnInit{
  data = inject(MAT_DIALOG_DATA);
  formulario:FormGroup;
  usuarios;
  constructor(private fb:FormBuilder, private usuariosService:UsuariosService){

    this.usuarios = JSON.parse(this.usuariosService.obtenerClaveStorage('usuarios'))


    this.formulario = this.fb.group({
      nombre:     [this.data.usuario.nombre ?? '', Validators.required],
      direccion:  [this.data.usuario.direccion ?? '', Validators.required],
      email:      [this.data.usuario.email ?? '', [Validators.required, this.validarCorreo]],
      cp:         [this.data.usuario.cp ?? '', [Validators.required, Validators.minLength(5)]],
      
    })
    
  }
  
  ngOnInit(): void {
    
  }
 
  actualizar(){
    const indice = this.usuarios.findIndex(usuario => usuario.id === this.data.usuario.id);
    if (indice !== -1) {
      this.usuarios[indice].nombre    = this.formulario.get('nombre').value
      this.usuarios[indice].direccion = this.formulario.get('direccion').value
      this.usuarios[indice].email     = this.formulario.get('email').value
      this.usuarios[indice].cp        = this.formulario.get('cp').value
    }
    this.usuariosService.guardarClaveStorage('usuarios', JSON.stringify(this.usuarios))
  }
  
  validarNumero(event: any, key): void {
    const valor        = event.target.value;
    event.target.value = valor.replace(/[^0-9]/g, '');
    this.formulario.controls[key].setValue(event.target.value, { emitEvent: false });
  }

  validarSoloLetras(event: any, key): void {
    const valor        = event.target.value;
    event.target.value = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
    this.formulario.controls[key].setValue(event.target.value, { emitEvent: false });
  }

  validarCorreo(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) {
      return null;
    }
    const correoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoValido.test(valor)) {
      return { correoInvalido: true }; 
    }
    return null;  
  }

}
