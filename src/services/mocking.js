import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

class MockingService{
    static async generarMascotasMocking(cantidad){
        const mascotas = [];
        for(let i = 0; i < cantidad; i++){
            mascotas.push({
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                adopted:false,
                birth:faker.date.past(),
                image:'https://via.placeholder.com/150'
            })
        }
        return mascotas
    }

    static async generarUsuariosMocking(cantidad){
        const usuarios = [];
        for(let i = 0; i < cantidad; i++){

            const password = await createHash("coder123")

            usuarios.push({
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    email: faker.internet.email(),
                    password:password,
                    role:faker.helpers.arrayElement(['user', 'admin']),
                    pets:[]
            })
        }
        return usuarios
    }
}

export default MockingService