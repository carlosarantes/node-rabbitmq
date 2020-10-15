const amqp = require('amqplib');

module.exports = class RabbitMessenger {

    constructor()
    {
        this.connection = null;
    }

    async openConnection(retry_on_error = true, tries = 1, max_tries = 3) {
        if (!this.connection) {
            this.connection = await amqp.connect('amqp://rabbitmq');
        }

        return this.connection;
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
        await new Promise(resolve => setTimeout(resolve, 10000));
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