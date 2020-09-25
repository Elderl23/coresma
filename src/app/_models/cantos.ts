export interface Cantos {
    jsonResultado: Array<JsonResultadoCantos>;
}

export interface JsonResultadoCantos {
    titulo: string;
    esquemasCantos:EsquemasCantos,
    tiemposLiturgiscos:TiemposLiturgiscos,
    status: boolean;
    _id: string;
}

interface EsquemasCantos {
    titulo: string;
    tiempoliturgico:boolean,
    status: boolean;
    _id: string;
}

interface TiemposLiturgiscos {
    titulo: string;
    tiempoliturgico:boolean,
    status: boolean;
    _id: string;
}


export interface Letras {
    jsonResultado: Array<JsonResultadoLetras>;
}

export interface JsonResultadoLetras {
    texto: string;
    etiqueta:string,
    estilo:string,
    status: boolean;
    _id: string;
}