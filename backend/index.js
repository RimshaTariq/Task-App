const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

app.use(bodyParser.json())

app.use(cors())

// Route to get tasks
app.get('/tasks',(req,res)=>{
    connection.query('SELECT * from tasks', (error,results)=>{
        if(error)
        {
            console.error('Error fetching tasks: ' + error.stack);
            return res.status(500).json({ error: 'Error fetching tasks' });
        }
        res.json(results);
    })
})

// Route to add a task
app.post('/tasks', (req, res) => {
    var task = req.body
    var taskData = [task.task_title,task.task_description]

    connection.query('INSERT INTO tasks(task_title, task_description) values(?)',[taskData], (error,results)=>{
        if (error) {
            console.error('Error adding task: ' + error.stack);
            return res.status(500).json({ error: 'Error adding task' });
        }
        res.json({ message: 'Task added successfully', task_id: results.insertId });
    })
});

// Route to delete a task
app.delete('/tasks/:task_id', (req, res) => {
    const taskId = req.params.task_id;
  
    // Delete the task from MySQL
    connection.query('DELETE FROM tasks WHERE task_id = ?', taskId, (error, results) => {
      if (error) {
        console.error('Error deleting task: ' + error.stack);
        return res.status(500).json({ error: 'Error deleting task' });
      }
      res.json({ message: 'Task deleted successfully' });
    });
});

// Route to update a task
app.put('/tasks/:task_id', (req, res) => {
    const task_id = req.params.task_id;
    const { task_title, task_description } = req.body;
  
    // Update the task in MySQL
    connection.query('UPDATE tasks SET task_title = ?, task_description = ? WHERE task_id = ?', 
                     [task_title, task_description, task_id], 
                     (error, results) => {
      if (error) {
        console.error('Error updating task: ' + error.stack);
        return res.status(500).json({ error: 'Error updating task' });
      }
      res.json({ message: 'Task updated successfully' });
    });
});


app.listen(3000,()=>console.log("Express server is running on port 3000"))

