import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { DetallesComponent } from './detalles/detalles.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MensajesComponent } from '../mensajes/mensajes.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  animations: [
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
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ],
  styleUrls: ['./home.component.scss']  
})

export class HomeComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | null = null; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _liveAnnouncer = inject(LiveAnnouncer);
  peticion:Boolean = false
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['nombre', 'direccion', 'cp', 'email'];
  dataSource = new MatTableDataSource<any>();;
  usuario:string = ''
  horaActual: string = '';
  usuarios;
  intervalo: any;
  fecha_actual = new Date()
  constructor(public usuariosService:UsuariosService, private router:Router,
              ) {}

  ngOnInit(): void {
    this.usuario = String (this.usuariosService.obtenerClaveStorage('usuario'))

    this.usuarios = JSON.parse(this.usuariosService.obtenerClaveStorage('usuarios'))
    this.usuariosService.usuarios = this.usuarios!=null ? this.usuarios : []
    this.dataSource.data = this.usuarios

    this.intervalo = setInterval(() => this.actualizarHora(), 1000); // Actualiza cada segundo
  }
  ngOnDestroy() {
    clearInterval(this.intervalo); // Limpia el intervalo al destruir el componente
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  actualizarHora() {
    const fecha = new Date();
    this.horaActual = fecha.toLocaleTimeString(); // Obtiene la hora en formato local
  }
  agregarUsuario(){
    this.peticion = true
    this.usuariosService.getUser().subscribe(resp=>{
      this.peticion = false
      let respuesta = resp.results[0]
      let usuario = {
        id:       resp.info.seed,
        nombre:   respuesta.name.title + " " +respuesta.name.first + " " + respuesta.name.last,
        direccion:respuesta.location.street.name + " " + respuesta.location.state + " " + respuesta.location.country,
        cp:       respuesta.location.postcode,
        email:    respuesta.email,
        avatar:   respuesta.picture.medium,
        telefono: respuesta.cell,
        genero:   respuesta.gender,
        edad:     respuesta.dob.age,  
        fecha_nacimiento:respuesta.dob.date,
      }
      this.usuariosService.guardarUsuario(usuario)
      this.dataSource.data = JSON.parse(this.usuariosService.obtenerClaveStorage('usuarios'))
      const dialog = this.dialog.open(
        MensajesComponent, 
        {
          width: '550px',
          height:'50%',
          panelClass: 'modal',
          disableClose:true,
          data: {
            tipo:'guardado',
            data:usuario
          }
        })
   })
  }
  detalles(usuario:any){
    const dialog = this.dialog.open(
      DetallesComponent, 
      {
        width: '550px',
        height:'50%',
        panelClass: 'modal',
        disableClose:true,
        data: {
          usuario:usuario
        }
      })
      dialog.afterClosed().subscribe(result => {
        this.dataSource.data = JSON.parse(this.usuariosService.obtenerClaveStorage('usuarios'))
      });
    
  }
  cerrarSesion(){
    this.usuariosService.eliminarClaveStorage('usuario')
    this.router.navigate(['']);
  }
  announceSortChange(sortState) {
    console.log("sort", sortState)
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

// La interfaz está fuera del decorador
export interface PeriodicElement {
  direccion: string;
  nombre: number;
  cp: number;
  email: string;
}

const ELEMENT_DATA = [
  {nombre: 1, direccion: 'Hydrogen', cp: 1.0079, email: 'H' },
  {nombre: 2, direccion: 'Helium', cp: 4.0026, email: 'He' },
  {nombre: 3, direccion: 'Lithium', cp: 6.941, email: 'Li' },
  {nombre: 4, direccion: 'Beryllium', cp: 9.0122, email: 'Be' },

];
