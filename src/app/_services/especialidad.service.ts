import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialidad } from '../_modulo/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private url: string = `${environment.HOST}/especialidades`;
  especialidadCambio = new Subject<Especialidad[]>();
  private mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get<Especialidad[]>(this.url)
  }
  listarPorId(idEspecialidad: number) {
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}`);
  }
  registrar(especialidad: Especialidad) {
    return this.http.post(this.url, especialidad);
  }
  modificar(especialidad: Especialidad) {
    return this.http.put(this.url, especialidad);
  }
  eliminar(idEspecialidad: number) {
    return this.http.delete(`${this.url}/${idEspecialidad}`);
  }

  //Setters and getters
  getEspecialidadCambio(){
    return this.especialidadCambio.asObservable();
  }

  // setPacienteCambio(){
  //   return this.pacienteCambio.next(pacientes);
  // }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensajeCambio:string){
    this.mensajeCambio.next(mensajeCambio);
  }
}
