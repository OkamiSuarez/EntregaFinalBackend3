import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js"

const app = express();
const PORT = process.env.PORT||8080;
mongoose.set('strictQuery', true);
const connection = mongoose.connect(`mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/Backend3FinalAltaClase?retryWrites=true&w=majority&appName=Cluster0`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

// 1.- se instala swagger: https://swagger.io
    // npm install swagger-jsdoc swagger-ui-express

// swagger-jsdoc deja escribir la configuracion en un acrhivo .yaml o en un json y a partir de ahi se genera un apidoc 

// swagger-ui-express ofrece un link a una interfaz grafica para observar la documentacion 

// 2.- Se importan los modulos
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

// 3.- se crea un config doc llamado swaggerOptions

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:'Documentacino de la app adopt me',
            description:"API pensada para encontrar familias para los animales"
        }
    },
    apis:[`src/docs/**/*.yaml`]
}

// 4.- se conecta swagger al servidor de express

const specs = swaggerJSDoc(swaggerOptions)

app.use("/apidocs", swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

export default app