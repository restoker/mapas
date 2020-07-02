export class API {
    async obtenerEstablecimientos(){
        const url = `https://api.datos.gob.mx/v1/precio.gasolina.publico`;

        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    }
}