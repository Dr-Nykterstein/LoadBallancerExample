const app = require('express')();
const fetch = require('node-fetch');
const factorial = require('./factorial');
const bodyParser = require('body-parser');

const masterPort = 5000;

const processTask = async (task) => {
  // console.log('process task: ', task);
  const startTime = new Date();
  factorial(task.number);
  const endTime = new Date();
  task.time = endTime - startTime;
  task.status = 'done';
  task.workerPort = process.env.PORT;

  try {
    // console.log('finish task: ', task);
    const res = await fetch(`http://localhost:${masterPort}/finish`, {
      body: JSON.stringify(task),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const newTask = await res.json();
    if (newTask.id !== undefined) {
      await processTask(newTask);
    }
  } catch (e) {
    console.log(e);
  }
};

app.use(bodyParser.json());

app.post('/calc', async (req, res) => {
  const task = req.body;
  res.send();

  await processTask(task);
});

app.listen(process.env.PORT, () => console.log(`worker listening on ${process.env.PORT}`))
