const { Kafka } = require("kafkajs");

exports.kafkaInstance = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
