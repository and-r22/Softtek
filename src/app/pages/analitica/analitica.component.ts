import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Analitica } from 'src/app/_modulo/analitica';
import { AnaliticaService } from 'src/app/_services/analitica.service';
import { AnaliticaDialogoComponent } from './analitica-dialogo/analitica-dialogo.component';

@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent implements OnInit {

  firstLastButtons = true;
  id: number;
  origen: MatTableDataSource<Analitica>;
  columnasAMostrar: string[] = ['idAnalitica', 'nombre', 'descripcion', 'acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private analiticaService: AnaliticaService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.analiticaService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);

      this.analiticaService.getAnaliticaCambio().subscribe(data => {
        this.origen = new MatTableDataSource(data);
        this.origen.sort = this.sort;
        this.origen.paginator = this.paginator;
      })
    })
  }

  openDialog(analitica?: Analitica): void {

    const dialogo1 = this.dialog.open(AnaliticaDialogoComponent, {
      data: analitica
    });

  }

  eliminar(id:number){
    this.analiticaService.eliminar(id).subscribe(()=>{
      this.analiticaService.listar().subscribe(data=>{
        this.analiticaService.setAnaliticaCambio(data);
        this.analiticaService.setMensajeCambio("ELIMINADO");
      })
    })
  }

}

