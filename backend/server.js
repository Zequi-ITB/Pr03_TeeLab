import express from 'express';
import camisetasRouter from './routes/camisetas.routes.js';
import comandasRouter from './routes/comandas.routes.js'
import cors from "cors";

const app = express();


// Middlewares globales
app.use(express.json());
app.use(cors());

// Log mínimo
app.use((req, res, next) => {
 console.log(req.method, req.url);
 next();
});


// Rutas
app.use('/api/camisetas',camisetasRouter);
app.use('/api/comandas', comandasRouter);


// Middleware de errores
app.use((err, req, res, next) => {
 console.error(err.message);
 res.status(500).json({ message: "Error interno" });
});


export default app;



