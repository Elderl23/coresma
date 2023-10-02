export interface EsquemasCantos {
    jsonResultado: Array<JsonResultadoEsquemasCantos>;
}

export interface JsonResultadoEsquemasCantos {
    titulo: string;
    tiempoliturgico:boolean,
    esquemasCantos:string,
    status: boolean;
    _id: string;
}