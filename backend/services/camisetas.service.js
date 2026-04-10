import { productosJSON } from '../data/camisetas.js';


// Comprueba si el id ya existe
const existsId = (id) => productosJSON.some(s => s.id === id);


export function getAll(req) {
let llistaFiltrada = productosJSON;
  if (req.query.talla) {
    llistaFiltrada= productosJSON.filter(camiseta => camiseta.tallas.some(talla => talla === req.query.talla));
  }
  if (req.query.color) {
    llistaFiltrada =  productosJSON.filter(camiseta => camiseta.colores.some(color => color === req.query.color));
  }
  if (req.query.tag) {
    llistaFiltrada = productosJSON.filter(camiseta => camiseta.tags.some(tag => tag === req.query.tag));
  }
  if (req.query.q) {
    const textEscapat = escaparRegex(req.query.q);
    const regex = new RegExp(textEscapat, "i");
    const llistaFiltrada = productosJSON.filter(camiseta => {
      return regex.test(String(camiseta.nombre || ""));
    })
    return llistaFiltrada;
  }

  return llistaFiltrada;
}

export function sortCamisetes(sort, camisetas) {
  const copia = [...camisetas];
  switch (sort) {
    case "precio_asc": return copia.sort((a, b) => Number(a.precioBase) - Number(b.precioBase))

    case "precio_desc": return copia.sort((a, b) => Number(b.precioBase) - Number(a.precioBase));

    case "nombre_asc": return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));

    case "nombre_desc": return copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
   
    default:
      return false;
  }
}

function escaparRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


export function getById(id) {
  return productosJSON.filter(s => s.id === id);

}


//Validacions camisetes
export function comprovarIdCamiseta(idComprovar) {
  if (!existsId(idComprovar)) return false;
  return true
}

export function comprovarColorCamiseta(idComprovar, colorComprovar) {
  let camiseta = productosJSON.filter(s => s.id === idComprovar);
  if (!camiseta[0].colores.some(color => color === colorComprovar)) return false;
  return true
}

export function comprovarTallaCamiseta(idComprovar, tallaComprovar) {
  let camiseta = productosJSON.filter(s => s.id === idComprovar);
  if (!camiseta[0].tallas.some(talla => talla === tallaComprovar)) return false;
  return true
}


