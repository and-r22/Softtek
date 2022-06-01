import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_modulo/medico';
import { MedicoService } from 'src/app/_services/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  firstLastButtons = true;
  id: number;
  origen: MatTableDataSource<Medico>;
  columnasAMostrar: string[] = ['idMedico', 'nombres', 'apellidos', 'cedula', 'acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private medicoService: MedicoService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.medicoService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);

      this.medicoService.getMedicoCambio().subscribe(data => {
        this.origen = new MatTableDataSource(data);
        this.origen.sort = this.sort;
        this.origen.paginator = this.paginator;
      })
    })
  }

  openDialog(medico?: Medico): void {

    const dialogo1 = this.dialog.open(MedicoDialogoComponent, {
      data: medico
    });

  }

  eliminar(id: number) {

  }

}

