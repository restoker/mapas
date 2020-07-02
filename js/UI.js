import {API} from './API.js';
export class UI {
    constructor() {
        this.api = new API();
        // Iniciar el mapa
        this.mapa = this.inicializarMapa();
        // crear capa de pines
        this.markers = new L.layerGroup();
    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;
    }

    mostrarEstablecimientos(){
        this.api.obtenerEstablecimientos()
                .then(data => {
                    const establecimientos = data.results;
                    this.agregarPines(establecimientos);
                });
    }

    agregarPines(datos){
        this.markers.clearLayers();
        const miIcono = L.icon({
            iconUrl: 'https://pngimage.net/wp-content/uploads/2018/06/red-point-png-.png',
            iconSize: [15, 15],
        })
        for (const dato of datos) {
                const {calle, regular, longitude, latitude, premium} = dato;
                // crear popup
                const popUp = L.popup()
                                .setContent(`
                                    <p>Calle: ${calle}</p>
                                    <p><b>Regular:</b>$${regular}</p>
                                    <p><b>Premium:</b>$${premium}</p>
                                `)
                                ;
                const marker = new L.marker([parseFloat(latitude), parseFloat(longitude)], {icon: miIcono});
                marker.bindPopup(popUp);
                this.markers.addLayer(marker);
                
        }
        this.markers.addTo(this.mapa);
    }

    filtrarResultados(campo) {
        this.api.obtenerEstablecimientos()
                    .then(data => {
                        const establecimientos = data.results;
                        this.filtrarEstablecimiento(establecimientos, campo);
                    });
    }

    filtrarEstablecimiento(datos, campo) {
        const datosFiltrados = datos.filter(dato => dato.calle.toLowerCase().indexOf(campo.toLowerCase()) !== -1);
        this.agregarPines(datosFiltrados);
    }
}
