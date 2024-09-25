import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.scss'
})
export class MensajesComponent implements OnInit{
  data = inject(MAT_DIALOG_DATA);
  constructor(private dialog:MatDialog){
    console.log("data", this.data)

  }
  ngOnInit(): void {
    setTimeout(() => {
      this.dialog.closeAll()
    }, 3000);
    
  }

}
