import { Historico } from './historico';
import { Aprazamento } from './aprazamento';

export interface Historico{
    _id?:number;
    aprazamento?:Aprazamento;
    mobile?:String;
    version?:String;
    userAgent?:String
    dtRegistrado?:Date;
}