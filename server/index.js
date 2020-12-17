const app = require('express')();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const workers = [5001, 5002, 5003, 5004];

const tasks = [];

// const task = {
//   id: 'asdasd',
//   status: 'asdasd',
//   number: 1000,
//   time: 1000,
//   workerPort: 1000,
// }
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST http://localhost:5000/calc?number=10000
app.post('/calc', async (req, res) => {
  const number = req.query.number;
  const task = {
    id: tasks.length,
    status: 'created',
    time: 0,
    workerPort: null,
    number,
  };

  const worker = workers.pop();
  if (worker) {
    fetch(`http://localhost:${worker}/calc`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(() => {
      task.status = 'in progress';
    });
  }
  tasks.push(task);
  res.send(JSON.stringify(task));
});

// POST http://localhost:5000/finish
app.post('/finish', async (req, res) => {
  const { workerPort, ...task } = req.body;
  const taskId = task.id;
  const idx = tasks.findIndex(({ id }) => id === taskId);
  tasks[idx] = { ...task, workerPort };

  const newTaskIdx = tasks.findIndex(({ status }) => status === 'created');
  if (newTaskIdx !== -1) {
    tasks[newTaskIdx].status = 'in progress';
    res.json(tasks[newTaskIdx]);
  } else {
    workers.push(workerPort);
    res.json({});
  }
  console.log(JSON.stringify(tasks, null, 2));
});

app.listen(5000, () => console.log('master listening on 5000'))
