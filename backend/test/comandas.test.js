import request from "supertest";
import app from "../server.js";



//POST comanda OK
describe("POST /api/comandas", () => {

  it("should create a comanda correctamente", async () => {
    const res = await request(app)
      .post("/api/comandas")
      .send({
        cliente: { nombre: "Ana", email: "ana@mail.com" },
        items: [
          {
            camisetaId: "TSH01",
            talla: "M",
            color: "negro",
            cantidad: 2
          }
        ]
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("comanda");
    expect(res.body.comanda).toHaveProperty("total");
  });

});


//POST comanda con camisetaId inválido → 400
it("should return 400 if camisetaId is invalid", async () => {
  const res = await request(app)
    .post("/api/comandas")
    .send({
      cliente: { nombre: "Ana", email: "ana@mail.com" },
      items: [
        {
          camisetaId: "INVALID",
          talla: "M",
          color: "negro",
          cantidad: 2
        }
      ]
    });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("message");
});


//GET comanda inexistente → 404
it("should return 404 if comanda does not exist", async () => {
  const res = await request(app).get("/api/comandas/NOEXIST");

  expect(res.statusCode).toBe(404);
});