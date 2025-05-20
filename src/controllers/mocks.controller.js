import MockingService from "../services/mocking.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";


const crearMascotas = async (req, res) => {
    const mascotas = await MockingService.generarMascotasMocking(50)
    res.send({ status: "exito", payload: mascotas })
}

const crearUsuarios = async (req, res) => {
    const usuarios = await MockingService.generarUsuariosMocking(50)
    res.send({ status: "exito", payload: usuarios })
}

const generateData = async (req, res) => {
    try {
        // Mandando por query
        const users = parseInt(req.query.users, 10) || 0;
        const pets = parseInt(req.query.pets, 10) || 0;

        // Validando
        if (users < 0 || pets < 0) {
            return res.status(400).json({
                status: "error",
                message: "Los parámetros 'users' y 'pets' deben ser números positivos"
            });
        }

        // Generar y guardar usuarios
        const mockUsers = await MockingService.generarUsuariosMocking(users);
        const savedUsers = await userModel.insertMany(mockUsers);

        // Generar y guardar mascotas
        const mockPets = await MockingService.generarMascotasMocking(pets);
        const savedPets = await petModel.insertMany(mockPets);

        return res.status(201).json({
            status: "exito",
            message: `Se generaron ${savedUsers.length} usuarios y ${savedPets.length} mascotas`,
            users: savedUsers.length,
            pets: savedPets.length
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al generar datos de prueba",
            error: error.message
        });
    }
}

export default {
    crearMascotas,
    crearUsuarios,
    generateData
}