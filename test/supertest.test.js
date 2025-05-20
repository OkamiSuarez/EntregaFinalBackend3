// instalamos con npm i supertest

// importamos
import supertest from "supertest";
// importamos tambien chai 
import { expect } from "chai";
// se crea la constante requester donde se haran las peticiones 
const requester = supertest('http://localhost:8080')

describe("testing de la app web adoptame",()=>{
    describe("test de mascotitas",()=>{

        it("el endpoint api/pets debe generar una mascota correctamente", async()=>{
            // creando el objecto de datos de la mascota nueva
            const pichichoMock = {
                // se crea un objeto con los datos de la nueva mascota
                name:'Firulaiss',
                specie:'Pichicho',
                birthDate:'2021-03-10'
            }

            const{statusCode,ok, _body} = await requester.post("/api/pets").send(pichichoMock)

            console.log(statusCode)
            console.log(ok)
            console.log(_body)
            // aca se verifican todos los datos con Chai

            expect(_body.payload).to.have.property("_id")
        })

        // nuevos test
        it("al crear una mascota solo con lo elemental se debe corroborar que la mascota creada cuente con una propiedad adopted false", async()=>{
            const nuevaMascota = {
                name:"Rex",
                specie: "Perro alfa",
                birthDate: "1980-06-01"
            }

            const {statusCode, _body} = await requester.post("/api/pets").send(nuevaMascota)

            expect(statusCode).to.equal(200)
            expect(_body.payload).to.have.property("adopted").that.equals(false)
        })

    })
})