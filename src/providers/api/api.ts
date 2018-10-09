import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Consumo } from '../../models/consumo';

@Injectable()
export class ApiProvider {

  apiUrl = 'https://salus-vitae-api.herokuapp.com';

  constructor(public http: HttpClient) {
  }

  getAprazamentos() {
    return this.http.get(`${this.apiUrl}/aprazamentos`);
  }

  getProntuario(id: string) {
    return this.http.get(`${this.apiUrl}/prontuarios/${id}`);
  }

  getMedicamento(id: string) {
    return this.http.get(`${this.apiUrl}/medicamentos/${id}`);
  }

  postConsumos(consumos: Consumo[]) {
    return Observable.of({ statusCode: 400 }).delay(5000);
  }

  postConsumosOkay(consumos: Consumo[]) {
    return Observable.of({ statusCode: 200 }).delay(5000);
  }

}
