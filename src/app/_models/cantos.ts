export interface Cantos {
    jsonResultado: Array<JsonResultadoCantos>;
}

export interface JsonResultadoCantos {
    titulo: string;
    descripcion: string;
    esquemasCantos:EsquemasCantos,
    tiemposLiturgiscosMany:EsquemasCantos[],
    tiemposLiturgiscos:TiemposLiturgiscos,
    status: boolean;
    ligadoEsquemaCantos:boolean;
    _id: string;
}

interface EsquemasCantos {
    titulo: string;
    tiempoliturgico:boolean,
    status: boolean;
    esquemasCantos:  string;
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