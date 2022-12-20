import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "kafka-producer-ignite-lab",
    brokers: ["superb-orca-5749-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username:
        "c3VwZXJiLW9yY2EtNTc0OSR-cfd_6GdirSWVt5_0tCG6j-gwlJuC9WxI2dN7bW0",
      password:
        "AolN_2scdeXwmuXDv4ZDJg5XdaVybO_cdAYVI0V5W8xzBX-mr9mkDbbXW_apHGKjh47ecw==",
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação de amizade!",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
