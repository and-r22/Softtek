import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Analitica } from '../_modulo/analitica';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService extends GenericService<Analitica> {

  analiticaCambio = new Subject<Analitica[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http, `${environment.HOST}/analiticas`
    );
  }

  getAnaliticaCambio(){
    return this.analiticaCambio.asObservable();
  }

  setAnaliticaCambio(analitica: Analitica[]){
    return this.analiticaCambio.next(analitica);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensajeCambio:string){
    this.mensajeCambio.next(mensajeCambio);
  }

}
