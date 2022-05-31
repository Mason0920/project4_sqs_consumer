const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const express = require('express');
const healthCheckApp = express();
const port = 3000

healthCheckApp.listen(port, ()=>{
  console.log(`app is running on ${port}`);
})
healthCheckApp.get('/health', (req, res)=>{
  res.status(200).send('this container is healthy')
  console.log('hi')
})
healthCheckApp.get('/', (req, res)=>{
  res.status(200).sned('hello-world')
})

AWS.config.update({
  region: "ap-norheast-2"
});

const app = Consumer.create({
  queueUrl: "https://sqs.ap-northeast-2.amazonaws.com/523139768306/EC2_SQS_ECS",
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