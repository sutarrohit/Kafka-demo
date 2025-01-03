# Kafka Demo Repository

This repository demonstrates the use of Kafka for message streaming using the `kafkajs` library. It includes examples of setting up a Kafka client, creating a topic, producing messages, and consuming messages.

## Prerequisites

To run this demo, ensure you have the following:

1. **Kafka**: Kafka must be installed and running on your system. You can download Kafka from [Apache Kafka](https://kafka.apache.org/downloads).
   - Default broker: `localhost:9092` (used in this demo).
2. **Node.js**: Ensure Node.js is installed (version 14 or above is recommended).
3. **NPM/Yarn**: Package manager for Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kafka-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## File Overview

### 1. `client.js`
This file initializes the Kafka client instance:
```javascript
const { Kafka } = require("kafkajs");

exports.kafkaInstance = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
```

### 2. `admin.js`
Creates a Kafka topic named `rider-updates`:
```javascript
const { kafkaInstance } = require("./client");

async function init() {
  const admin = kafkaInstance.admin();
  console.log("Admin connecting......");
  await admin.connect();
  console.log("Admin Connected successfully......");

  console.log("Creating a topic [rider-updates]....");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
        replicationFactor: 1,
        configEntries: [],
      },
    ],
  });
  console.log("Topic created successfully.....");

  await admin.disconnect();
  console.log("Admin Disconnected successfully......");
}

init().catch((error) => {
  console.error("Error in Kafka admin:", error);
});
```

### 3. `producer.js`
Produces messages to the `rider-updates` topic:
```javascript
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
```

### 4. `consumer.js`
Consumes messages from the `rider-updates` topic:
```javascript
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
```

## Running the Demo

1. **Start Kafka**:
   Ensure Kafka is running on `localhost:9092`.

2. **Create a Topic**:
   Run the `admin.js` script to create the topic:
   ```bash
   node admin.js
   ```

3. **Produce Messages**:
   Run the `producer.js` script to send messages to the topic:
   ```bash
   node producer.js
   ```

4. **Consume Messages**:
   Run the `consumer.js` script to consume messages from the topic:
   ```bash
   node consumer.js
   ```

## Expected Output

### Producer:
```
Producer connected successfully......
Topic produced successfully......
```

### Consumer:
```
Consumer connected successfully......
{
  topic: 'rider-updates',
  partition: 0,
  key: 'Rider-1',
  value: 'Rider-1 is going to the gym-2',
  headers: {}
}
```

## Notes
- This demo uses a single broker setup for simplicity.
- Adjust the broker configuration in `client.js` if needed.

## License
This project is licensed under the MIT License.
