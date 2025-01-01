const { kafkaInstance } = require("./client");

async function init() {
  const producer = kafkaInstance.producer();
  await producer.connect();
  console.log("Producer connected successfully......");

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        key: "Rider-1",
        value: "Rider-1 is going to the gym-2",
        partition: 0,
      },
    ],
  });

  console.log("Topic produced successfully......");
  await producer.disconnect();
}

init();
