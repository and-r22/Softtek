import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../_modulo/paciente';
import { GenericService } from './generic.service';
@Injectable({
  providedIn: 'root'
})
export class PacientesService extends GenericService<Paciente> {

  pacienteCambio = new Subject<Paciente[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http, `${environment.HOST}/pacientes`
    );
  }

  //Setters and getters
  getPacienteCambio(){
    return this.pacienteCambio.asObservable();
  }

  setPacienteCambio(pacientes:Paciente[]){
    return this.pacienteCambio.next(pacientes);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensajeCambio:string){
    this.mensajeCambio.next(mensajeCambio);
  }
}
