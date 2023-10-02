export interface TipoEsquemasLiturgicos {
    jsonResultado: Array<JsonResultadoTipoEsquemasLiturgicos>;
}

export interface JsonResultadoTipoEsquemasLiturgicos {
    titulo: string;
    esquemasCantos:EsquemasCantos,
    status: boolean;
    _id: string;
}

interface EsquemasCantos {
    titulo: string;
    tiempoliturgico:boolean,
    status: boolean;
    _id: string;
}

