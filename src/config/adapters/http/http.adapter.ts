

export abstract class HttpAdapter {

    //Porque se pone <T> en el metodo get?
    //Porque el metodo get puede devolver cualquier tipo de dato,
    //por eso se pone <T> para que se pueda devolver cualquier tipo de dato

    //Que hace el metodo get?
    //El metodo get hace una peticion http de tipo get a una url especificada
    //y devuelve una promesa con el resultado de la peticion

    //Que hace este metodo?
    //Este metodo es abstracto, por lo que no tiene implementacion, pero
    //se espera que las clases que hereden de esta clase implementen este metodo
    abstract get<T>(url: string, option?: Record<string, unknown>): Promise<T>;   

}