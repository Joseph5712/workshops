const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const users = [{id:1, name: "Juan", lastname: "Mendoza"}];

app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: "*"
}));


app.get('/', function (req, res) {

    const response =[
        {response: "Workshop #2"}
        ];
    res.json(response);
    });


/*1. Responder con un objeto json con el texto Hello World cuando se accede a la url /hello de a través de un GET.
Por ejemplo:
Request: GET /hello 
Response: { "response": "Hello World"}*/
app.get('/num1/hello', function (req, res) {

    const response =[
        {response: "Hello world"}
        ];
    res.json(response);
    });

//2. Si envía un parámetro en la cadena de consulta con el nombre "mensaje" se mostrará reemplazar la palabra
//en la respuesta de acuerdo con el valor en el atributo de mensaje
//Por ejemplo
//Request: GET /hello?message=Mundo
//Response: { "response": "Hello Mundo"}
app.get('/num2/hello', function (req, res) {
    const message = req.query.message;
    const response =[
        {response: `Hello ${message}`}
        ];
    res.json(response);
    });


/*3. Enviar una petición mediante un POST con un cuerpo en formato JSON que devuelva el texto
Request: POST /user
Body: {"name": "Bladimir", "lastname": "Arroyo"}
Response: { response: "El usuario Bladimir Arroyo fue creado"}*/
app.post('/num3/user', function (req, res) {
    
    const user = {
        id: users.length +1,
        name: req.body.name,
        lastname: req.body.lastname
    };
    users.push(user);

    const response =[
        {response: `El usuario ${user.name} ${user.lastname} fue creado`}
        ];
    res.json(response);
    });

  //start the app
app.listen(3001, () => console.log(`type service listening on port 3001!`))