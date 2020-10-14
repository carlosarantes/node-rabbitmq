const amqp = require('amqplib');

module.exports = class Rabbit {

    constructor()
    {}

    async openConnection() {
        return await amqp.connect('amqp://localhost');
    }

    async createChannel() {
        const conn = await this.openConnection();
        return conn.createChannel();
    }

    async sendMessage(message, q = 'messages') {
        const ch = await this.createChannel();
        return ch.assertQueue(q).then(function(ok) {
            return ch.sendToQueue(q, Buffer.from(message));
        });
    }

    async consume(q = 'messages') {
        const ch = await this.createChannel();
        return ch.assertQueue(q).then(function(ok) {
            return ch.consume(q, function(msg) {
                if (msg !== null) {
                  console.log(msg.content.toString());
                  ch.ack(msg);
                }
            });
        });
    }
}