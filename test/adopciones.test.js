import supertest from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

const requester = supertest(app)

// IDs de prueba (deben existir en la DB que tengo si se testea)
const VALID_USER_ID = "665000000000000000000001"; // Agregue este por que ya existe en la db y lo puede pasar
const VALID_PET_ID = "665000000000000000000102";  // este esta disponible para adopción
const VALID_ADOPTION_ID = "665000000000000000001001"; // tambien ya existe

describe("Pruebas Esenciales de Adopciones", () => {
  // GET /
  describe("GET /api/adoptions", () => {
    it("debe obtener todas las adopciones (status 200)", async () => {
      const res = await requester.get("/api/adoptions");
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("payload").that.is.an("array");
    });

    it("debe fallar con una ruta incorrecta (status 404)", async () => {
      const res = await requester.get("/api/adoptionz"); // Esto es una ruta mal escrita
      expect(res.status).to.equal(404);
    });
  });

  // GET /:aid
  describe("GET /api/adoptions/:aid", () => {
    it("debe obtener una adopción existente (status 200)", async () => {
      const res = await requester.get(`/api/adoptions/${VALID_ADOPTION_ID}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("payload");
      expect(res.body.payload).to.include.keys(["owner", "pet"]);
    });

    it("debe fallar con ID inválido (status 400 o 404)", async () => {
      const res = await requester.get("/api/adoptions/id-invalido-123");
      expect([400, 404]).to.include(res.status);
    });
  });

  // POST /:uid/:pid
  describe("POST /api/adoptions/:uid/:pid", () => {
    it("debe crear una adopción exitosa si la mascota está disponible, o fallar si ya está adoptada", async () => {
      const res = await requester
        .post(`/api/adoptions/${VALID_USER_ID}/${VALID_PET_ID}`)
        .send({ motivo: "Test de adopción" });

      if ([200, 201].includes(res.status)) {
        expect(res.body).to.have.property("status", "success");
      } else if (res.status === 400) {
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.match(/already adopted/i);
      } else {
        throw new Error(`Respuesta inesperada: ${res.status} ${JSON.stringify(res.body)}`);
      }
    });

    it("debe fallar si la mascota ya está adoptada (status 400)", async () => {
      // Ejecutar 2 veces el mismo POST para simular mascota ya adoptada
      await requester
        .post(`/api/adoptions/${VALID_USER_ID}/${VALID_PET_ID}`)
        .send({ motivo: "Primera adopción" });

      const res = await requester
        .post(`/api/adoptions/${VALID_USER_ID}/${VALID_PET_ID}`)
        .send({ motivo: "Segundo intento" });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.match(/already adopted/i);
    });
  });
});