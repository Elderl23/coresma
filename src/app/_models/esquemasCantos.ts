export interface EsquemasCantos {
    jsonResultado: Array<JsonResultadoEsquemasCantos>;
}

export interface JsonResultadoEsquemasCantos {
    titulo: string;
    tiempoliturgico:boolean,
    status: boolean;
    _id: string;
}