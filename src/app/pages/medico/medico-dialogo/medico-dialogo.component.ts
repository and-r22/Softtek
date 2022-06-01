import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medico } from 'src/app/_modulo/medico';
import { MedicoService } from 'src/app/_services/medico.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {

  modificar:boolean;
  medico:Medico;

  constructor(
    public dialogRef: MatDialogRef<MedicoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() : void {
    if(this.data != null){
      this.modificar = true;
    }else{
      this.modificar = false;
    }
    this.medico = { ...this.data};
  }

  cancelar() {
    this.dialogRef.close();
  }

  agregar() {
    if (this.modificar) {
      this.medicoService.modificar(this.medico).subscribe(() => {
        this.medicoService.listar().subscribe(medico => {
          this.medicoService.medicoCambio.next(medico);
          this.medicoService.setMensajeCambio("Se ha modificado");
        });
        this.medicoService.getMensajeCambio().subscribe(data =>{
          this.snackBar.open(data, 'AVISO', {duration : 2000});
        })
      });
    } else {
      this.medicoService.registrar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      }))
        .subscribe(medico => {
          this.medicoService.medicoCambio.next(medico);
          this.medicoService.setMensajeCambio("Se ha registrado");
        })
        this.medicoService.getMensajeCambio().subscribe(data =>{
          this.snackBar.open(data, 'AVISO', {duration : 2000});
        })
    }
  }
}
