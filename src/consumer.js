const RabbitMessenger = require('./services/RabbitMessenger');
const rabbitmq = new RabbitMessenger();

rabbitmq.consume();