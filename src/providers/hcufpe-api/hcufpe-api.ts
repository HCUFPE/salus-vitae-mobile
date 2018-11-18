import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Ala } from '../../models/ala.model';
import { Leito } from '../../models/leito.model';
import { Prontuario } from '../../models/prontuario.model';
import { Atendimento } from '../../models/atendimento.model';

@Injectable()
export class HCUFPEApiProvider {

    constructor(public http: HttpClient) {
    }

    getLeitos(): Promise<Ala> {
        const ala: Ala = {
            "Codigo Ala": "5N1000",
            "Ala": "05º ALA NORTE - NEFROLOGIA",
            "leitos": [
                {
                    "leito": 1,
                    "atendimento": 444444444,
                    "prontuario": 10000000
                },
                {
                    "leito": 2,
                    "atendimento": 444444445,
                    "prontuario": 10000001
                },
                {
                    "leito": 3,
                    "atendimento": 444444446,
                    "prontuario": 10000002
                },
                {
                    "leito": 4,
                    "atendimento": 444444447,
                    "prontuario": 10000003
                },
                {
                    "leito": 5
                },
                {
                    "leito": 6,
                    "atendimento": 444444448,
                    "prontuario": 10000004
                },
                {
                    "leito": 7,
                    "atendimento": 444444449,
                    "prontuario": 10000005
                },
                {
                    "leito": 8,
                    "atendimento": 444444450,
                    "prontuario": 10000006
                },
                {
                    "leito": 9,
                    "atendimento": 444444451,
                    "prontuario": 10000007
                },
                {
                    "leito": 10
                },
                {
                    "leito": 11,
                    "atendimento": 444444452,
                    "prontuario": 10000008
                },
                {
                    "leito": 12
                },
                {
                    "leito": 13
                },
                {
                    "leito": 14
                },
                {
                    "leito": 15
                },
                {
                    "leito": 16
                },
                {
                    "leito": 17
                },
                {
                    "leito": 18
                },
                {
                    "leito": 19
                },
                {
                    "leito": 20
                },
                {
                    "leito": 21
                },
                {
                    "leito": 22
                },
                {
                    "leito": 23
                },
                {
                    "leito": 24
                },
                {
                    "leito": 25
                },
                {
                    "leito": 26
                },
                {
                    "leito": 27
                },
                {
                    "leito": 28
                },
                {
                    "leito": 29
                }
            ]
        };

        return Observable.of(ala).delay(200).toPromise();
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
        const prontuario: Prontuario = {
            "prontuario": prontuario_id,
            "nomeDoPaciente": "JOSÉ AMARAL DOS SANTOS",
            "dataNascimento": "05/12/1970",
            "nomeMae": "MARIA DO CARMO AMARAL",
            "sexo": "M"
        };

        return Observable.of(prontuario).delay(200).toPromise();
    }

    getProntuarioWithAllDetails(prontuario: Prontuario): Promise<Prontuario> {
        return new Promise((resolve, reject) => {
            this.getLeitoByProntuario(prontuario.prontuario).then((leito: Leito) => {
                prontuario.leito = leito;

                resolve(prontuario);
            }).catch((err) => reject(err));
        });
    }

    getAtendimento(atendimento_id: number, prontuario_id: number): Promise<Atendimento> {
        const atendimento: Atendimento = {
            "atendimento": atendimento_id,
            "prontuario": prontuario_id,
            "prescricoes": [
                {
                    "prescricao": 7444444,
                    "dataPrescricao": "13/12/2018 00:00:00",
                    "tipoPrescricao": "M",
                    "statusPrescricao": "A",
                    "codigoProfissional": 65432,
                    "profissional": "MARIO ALVARES CABRAL",
                    "Itens": [
                        {
                            "ordemItem": 1,
                            "tipoItem": "Medicamentos",
                            "codigoItem": "1761",
                            "descricaoItem": "DIAZEPAM",
                            "observacaoItem": "Antes de dormir",
                            "frequencia": 24,
                            "administracao": "10MG/CP COMPRIMIDO ",
                            "aceitaDevolucao": "S",
                            "dataInicioItem": "13/12/2018 00:00:00",
                            "emUso": "S",
                            "codigoTipoItem": 3,
                            "gotejamento": "   "
                        },
                        {
                            "ordemItem": 2,
                            "tipoItem": "Dieta",
                            "codigoItem": "5",
                            "descricaoItem": "HIPOSSODICA - DIETA BRANDA",
                            "frequencia": 0,
                            "administracao": "1 UD Agora ORAL",
                            "aceitaDevolucao": "N",
                            "dataInicioItem": "15/08/2018 00:00:00",
                            "emUso": "S",
                            "codigoTipoItem": 1,
                            "gotejamento": "   "
                        }
                    ]
                },
                {
                    "prescricao": 7444444,
                    "dataPrescricao": "12/12/2018 00:00:00",
                    "tipoPrescricao": "M",
                    "statusPrescricao": "A",
                    "codigoProfissional": 65433,
                    "profissional": "MARIA CAROLINA ROMEIRO FIGUEIROA B COELHO",
                    "Itens": [
                        {
                            "ordemItem": 1,
                            "tipoItem": "Exames de Análises Clínicas ",
                            "codigoItem": "11043202",
                            "descricaoItem": "E23 - HEMOGRAMA COMPLETO",
                            "administracao": "1 UD ",
                            "aceitaDevolucao": "N",
                            "dataInicioItem": "12/12/2018 10:31:03",
                            "emUso": "S",
                            "codigoTipoItem": 8
                        },
                        {
                            "ordemItem": 2,
                            "tipoItem": "Medicamentos",
                            "codigoItem": "50040",
                            "descricaoItem": "ACICLOVIR",
                            "frequencia": 48,
                            "administracao": "200MG/CP COMPRIMIDO Administrar 2CP ",
                            "aceitaDevolucao": "S",
                            "dataInicioItem": "12/12/2018 00:00:00",
                            "emUso": "S",
                            "codigoTipoItem": 3,
                            "gotejamento": "   "
                        }
                    ]
                }
            ]
        };

        return Observable.of(atendimento).delay(200).toPromise();
    }

    getAtendimentoByPrescricao(atendimento_id: number, prontuario_id: number, prescricao_id: number): Promise<Atendimento> {
        const atendimento: Atendimento = {
            "atendimento": atendimento_id,
            "prontuario": prontuario_id,
            "prescricoes": [
                {
                    "prescricao": prescricao_id,
                    "dataPrescricao": "13/12/2018 00:00:00",
                    "tipoPrescricao": "M",
                    "statusPrescricao": "A",
                    "codigoProfissional": 65432,
                    "profissional": "MARIO ALVARES CABRAL",
                    "Itens": [
                        {
                            "ordemItem": 1,
                            "tipoItem": "Medicamentos",
                            "codigoItem": "1761",
                            "descricaoItem": "DIAZEPAM",
                            "observacaoItem": "Antes de dormir",
                            "frequencia": 24,
                            "administracao": "10MG/CP COMPRIMIDO ",
                            "aceitaDevolucao": "S",
                            "dataInicioItem": "13/12/2018 00:00:00",
                            "emUso": "S",
                            "codigoTipoItem": 3,
                            "gotejamento": "   "
                        },
                        {
                            "ordemItem": 2,
                            "tipoItem": "Dieta",
                            "codigoItem": "5",
                            "descricaoItem": "HIPOSSODICA - DIETA BRANDA",
                            "frequencia": 0,
                            "administracao": "1 UD Agora ORAL",
                            "aceitaDevolucao": "N",
                            "dataInicioItem": "15/08/2018 00:00:00",
                            "emUso": "S",
                            "codigoTipoItem": 1,
                            "gotejamento": "   "
                        }
                    ]
                }
            ]
        };

        return Observable.of(atendimento).delay(200).toPromise();
    }

}
