const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION
});

const app = Consumer.create({
  queueUrl: process.env.AWS_QUEUEURL,
  handleMessage: async (message) => {
    console.log(message.Body)
  },
  sqs: new AWS.SQS()
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.on('timeout_error', (err) => {
 console.error(err.message);
});

app.start();

console.log("앱 80포트에서 동작중..")