import { UI } from './UI.js';
const input = document.querySelector('input');
const ui = new UI;

const cargarMapa = () => {
    ui.mostrarEstablecimientos();
    
    const filtrarInput = e => {
        e.stopPropagation();
        const campo = input.value.trim();
        if (campo.length > 5) {
            ui.filtrarResultados(campo);
        } else {
            ui.mostrarEstablecimientos();
        }
    }
    input.addEventListener('input', filtrarInput);
}

document.addEventListener('DOMContentLoaded', cargarMapa);
