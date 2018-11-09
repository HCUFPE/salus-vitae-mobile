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

  getHistorico(uuid: string) {
    const consumos: Consumo[] = [{
      prontuario: { _id: '32323232', ala: 'dsadsa', dataAdmissao: null, dataAlta: null,
        idPaciente: { _id: '32dsa43', alergias: null, nome: 'Josias', nomeMae: null, nomePai: null, numeroCpf: null,
        numeroRg: null, sexo: null }, leito: null, pesoAdmissao: null, prescricoes: null },
      aprazamento: { _id: '2390dsa', enfermeira: null, horario: new Date(2018, 12, 20, 10, 30, 0, 0), intervalo: '3',
        isCancelado: false, isConsumido: false, medicamento: { _id: '3232dsadas', dataFabricacao: null,
          dataValidade: null, dosagem: '15 mg', nome: 'Farlac'}, paciente: { _id: '32dsa43', alergias: null, nome: 'Josias', nomeMae: null, nomePai: null, numeroCpf: null,
          numeroRg: null, sexo: null }},
      usuario: { _id: 'dad3', cpf: null, email: null, name: 'Marilia' },
      horario: new Date(2018, 12, 20, 10, 30, 0, 0),
      device_uuid: 'dasDKLASJDKSALJKL323232DKSADLASK',
      device_serial: 'DSADSADSADSA32dsa',
      device_manufacturer: 'motorola',
      device_model: 'passion',
      device_platform: 'Android',
      device_version: '7.1.1'
    },
    {
      prontuario: { _id: '32323232', ala: 'dsadsa', dataAdmissao: null, dataAlta: null,
        idPaciente: { _id: '32dsa43', alergias: null, nome: 'Josias', nomeMae: null, nomePai: null, numeroCpf: null,
        numeroRg: null, sexo: null }, leito: null, pesoAdmissao: null, prescricoes: null },
      aprazamento: { _id: '2390dsa', enfermeira: null, horario: new Date(2018, 12, 20, 20, 0, 0, 0), intervalo: '3',
        isCancelado: false, isConsumido: false, medicamento: { _id: '3232dsadas', dataFabricacao: null,
          dataValidade: null, dosagem: '15 mg', nome: 'Farlac'}, paciente: { _id: '32dsa43', alergias: null, nome: 'Josias', nomeMae: null, nomePai: null, numeroCpf: null,
          numeroRg: null, sexo: null }},
      usuario: { _id: 'dad2', cpf: null, email: null, name: 'Luiz' },
      horario: new Date(2018, 12, 20, 20, 0, 0, 0),
      device_uuid: 'dasDKLASJDKSALJKL323232DKSADLASK',
      device_serial: 'DSADSADSADSA32dsa',
      device_manufacturer: 'motorola',
      device_model: 'passion',
      device_platform: 'Android',
      device_version: '7.1.1'
    }];

    return Observable.of(consumos).delay(5000);
  }

  postConsumos(consumos: Consumo[]) {
    return Observable.of({ statusCode: 400 }).delay(5000);
  }

  postConsumosOkay(consumos: Consumo[]) {
    return Observable.of({ statusCode: 200 }).delay(5000);
  }

}
