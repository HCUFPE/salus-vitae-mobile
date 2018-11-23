import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HCUFPEApiProvider } from '../hcufpe-api/hcufpe-api';
import { PreOperacao } from '../../models/pre-operacao.model';
import { Operacao } from '../../models/operacao.model';
import { Prontuario } from '../../models/prontuario.model';
import { Atendimento } from '../../models/atendimento.model';
import { Prescricao } from '../../models/prescricao.model';

@Injectable()
export class SalusVitaeApiProvider {

  private apiUrl = 'https://salus-vitae-api.herokuapp.com';

  constructor(private http: HttpClient, private hcUfpeApi: HCUFPEApiProvider) {
  }

  getPreOperacoes(): Promise<PreOperacao[]> {
    return this.http.get<PreOperacao[]>(`${this.apiUrl}/preOpAprazamentos`).toPromise();
  }

  getPreOperacaoById(id: string): Promise<PreOperacao> {
    return this.http.get<PreOperacao>(`${this.apiUrl}/preOpAprazamentos/${id}`).toPromise();
  }

  getPreOperacoesByProntuario(prontuario: number, atendimento: number): Promise<PreOperacao[]> {
    return new Promise((resolve, reject) => {
      this.getPreOperacoes()
        .then((aprazamentos: PreOperacao[]) => {
          resolve(aprazamentos.filter(a => a.cdProntuario === prontuario && a.cdAtendimento === atendimento));
        })
        .catch((err) => reject(err));
    });
  }

  async getPreOperacaoWithAllDetails(aprazamento: PreOperacao): Promise<PreOperacao> {
    aprazamento.prontuario = await this.hcUfpeApi.getProntuario(aprazamento.cdProntuario);
    aprazamento.atendimento = await this.hcUfpeApi.getAtendimentoByPrescricao(aprazamento.cdProntuario,
      aprazamento.cdAtendimento, aprazamento.cdPrescricao);

    const prescricao: Prescricao = aprazamento.atendimento.prescricoes
      .find(p => p.prescricao === aprazamento.cdPrescricao);

    if (prescricao !== undefined) {
      aprazamento.itemPrescricao = prescricao.Itens.find(i => i.ordemItem === aprazamento.ordemItem &&
        i.codigoTipoItem === aprazamento.cdTpItem &&
        i.codigoItem == aprazamento.cdItem);
    }

    return aprazamento;
  }

  async getPreOperacoesWithAllDetails(aprazamentos: PreOperacao[]): Promise<PreOperacao[]> {
    const prontuarios: Map<number, Prontuario> = new Map();
    const atendimentos: Map<Number, Atendimento> = new Map();

    for (const aprazamento of aprazamentos) {
      if (!prontuarios.has(aprazamento.cdProntuario)) {
        let prontuario: Prontuario;

        try {
          prontuario = await this.hcUfpeApi.getProntuario(aprazamento.cdProntuario);
          prontuario = await this.hcUfpeApi.getProntuarioWithAllDetails(prontuario);
        } catch(err) {
        }

        prontuarios.set(aprazamento.cdProntuario, prontuario);
      }

      if (!atendimentos.has(aprazamento.cdAtendimento)) {
        let atendimento: Atendimento;

        try {
          atendimento = await this.hcUfpeApi.getAtendimentoByPrescricao(aprazamento.cdProntuario,
            aprazamento.cdAtendimento, aprazamento.cdPrescricao);
        } catch(err) {
        }

        atendimentos.set(aprazamento.cdAtendimento, atendimento);
      }
      
      aprazamento.prontuario = prontuarios.get(aprazamento.cdProntuario);
      aprazamento.atendimento = atendimentos.get(aprazamento.cdAtendimento);

      if (aprazamento.atendimento !== undefined) {
        aprazamento.prescricao = aprazamento.atendimento.prescricoes
          .find(p => p.prescricao === aprazamento.cdPrescricao);
      }

      if (aprazamento.prescricao !== undefined) {
        aprazamento.itemPrescricao = aprazamento.prescricao.Itens.find(i => i.ordemItem === aprazamento.ordemItem &&
          i.codigoTipoItem === aprazamento.cdTpItem &&
          i.codigoItem == aprazamento.cdItem);
      }
    }

    return aprazamentos;
  }

  async getOperacaoWithAllDetails(consumo: Operacao): Promise<Operacao> {
    const aprazamento: PreOperacao = await this.getPreOperacaoById(consumo.cdPreOperacaoAprazamento);
    consumo.aprazamento = await this.getPreOperacaoWithAllDetails(aprazamento);

    return consumo;
  }

  async getOperacoesWithAllDetails(consumos: Operacao[]): Promise<Operacao[]> {
    const aprazamentos: Map<string, PreOperacao> = new Map();

    for (const consumo of consumos) {
      if (!aprazamentos.has(consumo.cdPreOperacaoAprazamento)) {
        let aprazamento: PreOperacao;

        try {
          aprazamento = await this.getPreOperacaoById(consumo.cdPreOperacaoAprazamento);
          aprazamento = await this.getPreOperacaoWithAllDetails(aprazamento);
        } catch(err) {
        }

        aprazamentos.set(consumo.cdPreOperacaoAprazamento, aprazamento);
      }

      consumo.aprazamento = aprazamentos.get(consumo.cdPreOperacaoAprazamento);
    }

    return consumos;
  }

  getHistorico(uuid: string): Promise<Operacao[]> {
    return this.http.get<Operacao[]>(`${this.apiUrl}/opConsumoRodelagemDevice/${uuid}`).toPromise();
  }

  postOperacao(consumo: Operacao): Promise<Operacao> {
    return Observable.of<Operacao>(consumo).delay(200).toPromise();
  }

  async postOperacoes(consumos: Operacao[]): Promise<any[]> {
    const response: any[] = [];

    for (const consumo of consumos) {
      this.postOperacao(consumo)
        .then((consumo: Operacao) => response.push(consumo))
        .catch((err: any) => response.push(err));
    }

    return response;
  }

}
