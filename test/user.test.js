// npm install -D mocha
import mongoose from "mongoose";
import { assert } from "chai";
// modulo nativo de nodeJs que hace validaciones
import User from "../src/dao/Users.dao.js"

// me conecto a la DB
const connection = mongoose.connect(`mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/Backend3FinalAltaClase?retryWrites=true&w=majority&appName=Cluster0`)

// describe es una funcion que agrupa un conjunto de pruebas relacionadas bajo un mismo bloque descriptivo 

describe("Testeando el DAO de usuarios", function(){

    before(function () {
        this.userDao = new User()
    })

    "Se limpia la DB cada que se testea"
    this.beforeEach(async function(){
        await mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })

    //pruebas
    it("el get de usuarios retorna un array", async function (){
        const resultado = await this.userDao.get()
        assert.strictEqual(Array.isArray(resultado), true)
    })
    
    // test 1

    it("El DAO debe agregar correctamente un elemento a la base de datos", async function(){
        let usuario = {
            first_name: "Goldie",
            last_name: "Legrand",
            email: "goldi@legrand.com",
            password: "1234"
        }

        const resultado = await this.userDao.save(usuario)
        assert.ok(resultado._id)
    })

    // test 2
    it("Al agregar un nuevo usuario, debe crearse con un arreglo de mascotas vacio por defecto", async function (){
        let usuario = {
            first_name: "Goldie",
            last_name: "Legrand",
            email: "goldi@legrand.com",
            password: "1234"
        }

        const resultado = await this.userDao.save(usuario)
        assert.deepStrictEqual(resultado.pets, [])
    })

    // test 3
    it("El DAO puede obtener a un usuario por email", async function(){
        let usuario = {
            first_name: "Goldie",
            last_name: "Legrand",
            email: "goldi@legrand.com",
            password: "1234"
        }

        await this.userDao.save(usuario)

        const user = await this.userDao.getBy({email: usuario.email})
        assert.strictEqual(typeof user, "object")
    })

    after(async function (){
        await mongoose.disconnect()
    })

})