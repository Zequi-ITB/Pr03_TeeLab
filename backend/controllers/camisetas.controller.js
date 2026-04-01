import * as camisetasService from '../services/camisetas.service.js';


export function getAllCamisetas(req, res) {

  let productes = camisetasService.getAll(req);


  if (!productes || productes.length < 1) return res.status(404).json({ error: "No hay camisetas" });

  if(req.query.sort){
    const productosSorted = camisetasService.sortCamisetes(req.query.sort, productes);
    if(productosSorted == false) return res.status(400).json({ message: "Parametro de sort incorrecto" });
    return res.json(productosSorted);
  }

  return res.json(productes);
}


export function getCamisetaById(req, res) {
  const camiseta = camisetasService.getById(req.params.id);

  if (!camiseta || camiseta.length < 1) return res.status(404).json({ message: "Camiseta no encontrada" });

  res.json(camiseta);
}






