const { kafkaInstance } = require("./client");

async function init() {
  // Connect to the admin client
  const admin = kafkaInstance.admin();
  console.log("Admin connecting......");
  await admin.connect(); // Use await here
  console.log("Admin Connected successfully......");

  // Create a topic
  console.log("Creating a topic [rider-updates]....");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
        replicationFactor: 1,
        configEntries: [], // Replica assignment is not necessary for a single broker setup
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
