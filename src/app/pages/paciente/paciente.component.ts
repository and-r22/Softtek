import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_modulo/paciente';
import { PacientesService } from 'src/app/_services/pacientes.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  id:number;
  pacientes: Paciente[];
  origen:MatTableDataSource<Paciente>;
  columnasAMostrar:string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];

  constructor(private pacienteService: PacientesService) { }

  ngOnInit(): void {
    // this.pacienteService.getMensajeCambio().subscribe(data =>{
    //   this.snackBar.open(data, 'AVISO', {duration : 2000});
    // })

    this.pacienteService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);

      this.pacienteService.getPacienteCambio().subscribe(data => {
        this.origen = new MatTableDataSource(data);
        // this.origen.sort = this.sort;
        // this.origen.paginator = this.paginator;
      })
    })
  }

  eliminar(id:number){
    this.pacienteService.eliminar(id).subscribe(()=>{
      this.pacienteService.listar().subscribe(data=>{
        this.pacienteService.setPacienteCambio(data);
        this.pacienteService.setMensajeCambio("ELIMINADO");
      })
    })
  }

}
