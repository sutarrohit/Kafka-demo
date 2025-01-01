const { kafkaInstance } = require("./client");

async function init() {
  const consumer = kafkaInstance.consumer({ groupId: "user-1" });
  await consumer.connect();
  console.log("Consumer connected successfully......");

  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log({
        topic: topic,
        partition: partition,
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
      });
    },
  });
}

init();
