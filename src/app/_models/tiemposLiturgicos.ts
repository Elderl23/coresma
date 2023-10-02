export interface TiemposLiturgicos {
    jsonResultado: Array<JsonResultado>;
}

export interface JsonResultado {
    descripcion: string;
    status: boolean;
    titulo: string;
    urlimagen: string;
    _id: string;
}