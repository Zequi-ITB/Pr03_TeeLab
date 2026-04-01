import * as camisetasService from '../services/camisetas.service.js';
import { comandas } from '../data/comandas.js';
import { nextId, incrementarId } from '../data/comandas.js';


export function getAll() {
    let comandasTotal = comandas;
    return comandasTotal;
}


export function getById(id) {
    return comandas.filter(comanda => comanda.id === id);
}

const comprovarCantidad = (comanda) => comanda.items.some(camiseta => camiseta.cantidad < 1);

function validateComanda(comandaNew) {
    if (!comandaNew || typeof comandaNew !== "object") return "Body inválido";
    if (!comandaNew.cliente.nombre || !comandaNew.cliente.email || !comandaNew.items || comandaNew.items.length < 1) return "Faltan campos";
    if (comprovarCantidad(comandaNew)) return "Cantidad erronea";
    if (!comandaNew.items.every(camiseta => camisetasService.comprovarIdCamiseta(camiseta.camisetaId))) return "Id incorrecte"
    if (!comandaNew.items.every(camiseta => camisetasService.comprovarTallaCamiseta(camiseta.camisetaId, camiseta.talla))) return "La talla no esta disponible"
    if (!comandaNew.items.every(camiseta => camisetasService.comprovarColorCamiseta(camiseta.camisetaId, camiseta.color))) return "El color no esta disponible"
    return false;
}

export function create(comandaNew) {
    const validationMsg = validateComanda(comandaNew);
    if (validationMsg) return { error: validationMsg };

    //Afegim el preu al final
    comandaNew.items.forEach(camiseta => {
        camiseta.precioUnitario = camisetasService.getById(camiseta.camisetaId)[0].precioBase
        camiseta.subtotal = camisetasService.getById(camiseta.camisetaId)[0].precioBase * camiseta.cantidad
    });

    //Total del ticket
    let totalPreu = comandaNew.items.reduce((total, camiseta) => total + camiseta.subtotal, 0);

    //Ticket
    let ticket = {
        id: `ORD-000${nextId}`,
        fecha: new Date().toISOString(),
        estado: "recibida",
        items: comandaNew.items,
        "total": totalPreu
    }

    //guardem comanda 
    let comanda = {
        id: `ORD-000${nextId}`,
        comanda: comandaNew
    }


    incrementarId();

    comandas.push(comanda);
    return { data: ticket };
}
