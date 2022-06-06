import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Analitica } from 'src/app/_modulo/analitica';
import { DetalleConsulta } from 'src/app/_modulo/detalleConsulta';
import { Especialidad } from 'src/app/_modulo/especialidad';
import { Medico } from 'src/app/_modulo/medico';
import { Paciente } from 'src/app/_modulo/paciente';
import { AnaliticaService } from 'src/app/_services/analitica.service';
import { ConsultaService } from 'src/app/_services/consulta.service';
import { EspecialidadService } from 'src/app/_services/especialidad.service';
import { MedicoService } from 'src/app/_services/medico.service';
import { PacientesService } from 'src/app/_services/pacientes.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];
  pacientes$: Observable<Paciente[]>;
  // Forma de declarar un Observable
  medicos$: Observable<Medico[]>;
  especialidades$: Observable<Especialidad[]>;
  examenes$: Observable<Analitica[]>;
  idPacienteSeleccionado: number;
  idMedicoSeleccionado: number;
  idEspecialidadSeleccionada: number;
  examenSeleccionado: Analitica;
  fechaSeleccionada: Date = new Date();

  maxFecha: Date = new Date();
  diagnostico: string;
  tratamiento: string;

  detalleConsulta: DetalleConsulta[] = [];
  examenesSelecccionados: Analitica[] = [];

  constructor(private pacienteService: PacientesService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private examenService: AnaliticaService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarInicial();
  }

  listarInicial() {
    // this.pacienteService.listar().subscribe(data => this.pacientes = data);
    this.pacientes$ = this.pacienteService.listar();
    this.medicos$ = this.medicoService.listar();
    this.especialidades$ = this.especialidadService.listar();
    this.examenes$ = this.examenService.listar();
  }

  agregar() {
    if (this.diagnostico && this.tratamiento) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
    } else {
      this.snackBar.open('Debe agregar un diagnostico y tratamiento', 'Aviso', { duration: 2000 });
    }
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }

  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSelecccionados.length; i++) {
        let examen = this.examenesSelecccionados[i];
        if (examen.idAnalitica === this.examenSeleccionado.idAnalitica) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.snackBar.open('El examen ya ha sido seleccionado', 'Aviso', { duration: 2000 });
      } else {
        this.examenesSelecccionados.push(this.examenSeleccionado);
      }
    }
  }

  removerExamen(index: number) {
    this.examenesSelecccionados.splice(index, 1);
  }

}
