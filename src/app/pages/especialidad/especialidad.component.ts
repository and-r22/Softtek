import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Especialidad } from 'src/app/_modulo/especialidad';
import { EspecialidadService } from 'src/app/_services/especialidad.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  id:number;
  especialidades: Especialidad[];
  origen:MatTableDataSource<Especialidad>;
  columnasAMostrar:string[] = ['idEspecialidad', 'nombre', 'descripcion', 'acciones'];

  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    // this.especialidadService.getMensajeCambio().subscribe(data =>{
    //   this.snackBar.open(data, 'AVISO', {duration : 2000});
    // })

    this.especialidadService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);

      this.especialidadService.getEspecialidadCambio().subscribe(data => {
        this.origen = new MatTableDataSource(data);
        // this.origen.sort = this.sort;
        // this.origen.paginator = this.paginator;
      })
    })
  }

  eliminar(id:number){
    this.especialidadService.eliminar(id).subscribe(()=>{
      this.especialidadService.listar().subscribe(data=>{
        this.especialidadService.setEspecialidadCambio(data);
        this.especialidadService.setMensajeCambio("ELIMINADO");
      })
    })
  }

}
