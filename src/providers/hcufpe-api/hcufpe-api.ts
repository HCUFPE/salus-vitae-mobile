import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ala } from '../../models/ala.model';
import { Leito } from '../../models/leito.model';
import { Prontuario } from '../../models/prontuario.model';
import { Atendimento } from '../../models/atendimento.model';
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class HCUFPEApiProvider {

  public static BASE_URL: string = '10.34.8.1:7070';
  public static LOGIN_URL: string = `http://${HCUFPEApiProvider.BASE_URL}/auth-service/ws/login`;

  private static BASE_CONTEXT: string = 'humaster/ws';

  constructor(public http: HttpClient) {
  }

  login(usuario: Usuario): Promise<Usuario> {
    return this.http
      .post<Usuario>(HCUFPEApiProvider.LOGIN_URL, new HttpParams()
        .set('username', usuario.username)
        .set('password', usuario.password),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .toPromise();
  }

  getLeitos(): Promise<Ala> {
    return this.http
      .get<Ala>(`http://${HCUFPEApiProvider.BASE_URL}/${HCUFPEApiProvider.BASE_CONTEXT}/ala/5N1000`)
      .toPromise();
  }

  getLeitoByProntuario(prontuario_id: number): Promise<Leito> {
    return new Promise((resolve, reject) => {
      this.getLeitos().then((ala: Ala) => {
        const leito: Leito = ala.leitos.find((l: Leito) => l.prontuario === prontuario_id);

        if (leito) {
          leito.ala = ala;
        }

        resolve(leito);
      }).catch((err) => reject(err));
    });
  }

  getProntuario(prontuario_id: number): Promise<Prontuario> {
    return this.http
      .get<Prontuario>(`http://${HCUFPEApiProvider.BASE_URL}/${HCUFPEApiProvider.BASE_CONTEXT}/prontuario/${prontuario_id}`)
      .toPromise();
  }

  getProntuarioWithAllDetails(prontuario: Prontuario): Promise<Prontuario> {
    return new Promise((resolve, reject) => {
      this.getLeitoByProntuario(prontuario.prontuario).then((leito: Leito) => {
        prontuario.leito = leito;

        resolve(prontuario);
      }).catch((err) => reject(err));
    });
  }

  getAtendimento(prontuario_id: number, atendimento_id: number): Promise<Atendimento> {
    return this.http
      .get<Atendimento>(`http://${HCUFPEApiProvider.BASE_URL}/${HCUFPEApiProvider.BASE_CONTEXT}` +
      `/prontuario/${prontuario_id}/atendimento/${atendimento_id}`)
      .toPromise();
  }

  getAtendimentoByPrescricao(prontuario_id: number, atendimento_id: number, prescricao_id: number): Promise<Atendimento> {
    return this.http
      .get<Atendimento>(`http://${HCUFPEApiProvider.BASE_URL}/${HCUFPEApiProvider.BASE_CONTEXT}` +
      `/prontuario/${prontuario_id}/atendimento/${atendimento_id}?prescricao=${prescricao_id}`)
      .toPromise();
  }

}
