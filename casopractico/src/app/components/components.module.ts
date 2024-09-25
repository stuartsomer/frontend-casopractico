import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [],
  exports:[
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSortModule,
    MatPaginatorModule
    
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
