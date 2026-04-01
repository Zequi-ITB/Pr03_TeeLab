import * as comandasService from '../services/comandas.service.js';



export function getAllComandas(req, res) {
  let comandas = comandasService.getAll()
  if (comandas.length < 1) return res.status(404).json({ error: "No hay comandas" });
  res.json(comandas);
}


export function getComandaById(req, res) {
  const comanda = comandasService.getById(req.params.id);

  if (!comanda || comanda.length < 1) return res.status(404).json({ message: "Comanda no encontrada" });

  return res.json(comanda);
}

export function createComanda(req, res) {
  const result = comandasService.create(req.body);

  if (result.error) {
    const status = result.status || 400;
    return res.status(status).json({ message: result.error });
  }


  res.status(201).json({ message: "Created", comanda: result.data });
}




