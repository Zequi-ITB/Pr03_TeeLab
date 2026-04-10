# TeeLab — FullStack (Frontend + Backend)

TeeLab és una microbotiga de samarretes amb una API REST (backend) i una aplicació web (frontend) que consumeix aquesta API.

## Estructura del projecte

- `backend/` — API amb Node + Express
- `frontend/` — aplicació web (HTML, CSS, JS)
- `test/` — tests del backend


## Cómo arrancar

### Backend

1. Entrar a la carpeta `backend/`.
2. Instalar dependencias:

```
npm install
```

3. Ejecutar en modo desenvolupament:

```
npm run dev
```

El servidor per defecte s'executa en `http://localhost:3001/`.

Assegura't que el servidor tingui CORS activat per permetre peticions des de l'origen on serveixis el frontend.

### Frontend

El frontend és estàtic i es pot servir de diverses maneres. Opcions recomanades:

- Obrir `frontend/index.html` amb l'extensió Live Server de VSCode.
- O servir la carpeta `frontend/` amb un servidor senzill:

Assegura't que el backend estigui executant-se (port 3001) i que l'origen del frontend estigui autoritzat pel CORS del servidor.

## Endpoints utilitzats

Camisetas
- GET `/api/camisetas`
  - Obtiene todas las camisetas. Soporta filtros via query params:
    - `talla` (S, M, L...)
    - `color` (ej. `negro`)
    - `tag` (ej. `nuevo`)
    - `q` (texto — busca en nombre)
    - `sort`: `precio_asc`, `precio_desc`, `nombre_asc`, `nombre_desc`
  - Ejemplo:

    `GET /api/camisetas?talla=M&color=negro&sort=precio_asc`

- GET `/api/camisetas/:id`
  - Detalle de una camiseta. Respuestas: `200 OK` / `404 Not Found`.

Comandas (pedidos)
- POST `/api/comandas`
  - Crear una comanda. Body esperado (ejemplo):

```json
{
  "cliente": { "nombre": "Juan", "email": "juan@ejemplo.com" },
  "direccion": "C/ Exemple 1, 08000",
  "items": [
    { "camisetaId": "TSH01", "nombre": "MACACARENA", "talla": "M", "color": "negro", "cantidad": 2, "precio": 19.95 }
  ]
}
```
  - Respuestas: `201 Created` (devuelve ticket) / `400 Bad Request` (error de validación).

- GET `/api/comandas` — Obtener totes les comandes.
- GET `/api/comandas/:id` — Obtener detalle de una comanda.


## Tests

Per executar els tests del backend:

```
npm test
```

Els tests inclouen casos com:
- Crear comanda correctament
- Error amb `camisetaId` invàlid
- Obtener comanda inexistente
