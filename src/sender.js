const express = require('express');
const cors = require('cors'); 
const app = express();

const RabbitMessenger = require('./services/RabbitMessenger');
const rabbitmq = new RabbitMessenger();

app.use(express.json());
app.use(cors());

app.post('/send-message', function(req, res){
    const message = req.body.message;
    rabbitmq.sendMessage(message)
    res.json({ message:'Mensagem enviada.' });
});

app.listen(3333, () => {
    console.log('Listening to port 3333')
});