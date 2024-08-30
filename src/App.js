import { useState } from 'react';
import initialTasks from './data/initialTasks.js';

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className='app'>
      <Header />
      <Form tasks={tasks} onTasks={setTasks} />
      <Content tasks={tasks} onTasks={setTasks} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className='header'>
      <h1>
        <span>☑️</span> Stuff To Do
      </h1>
    </div>
  );
}

function Form({ onTasks }) {
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newTask = {
      id: crypto.randomUUID(),
      description,
      finished: false,
    };
    console.log(newTask);
    onTasks((tasks) => [...tasks, newTask]);

    setDescription(''); // Clear form after submit
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        placeholder='Add a new task...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button className='form-btn'>+</button>
    </form>
  );
}

function Content({ tasks, onTasks }) {
  function toggleTask(id) {
    onTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, finished: !task.finished } : task
      )
    );
  }

  function deleteTask(id) {
    onTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  return (
    <div className='content'>
      <UnfinishedTaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
      <FinishedTaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

function UnfinishedTaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <>
      {tasks.filter((task) => task.finished === false).length > 0 ? (
        <div className='unfinished-task-list'>
          <ul className='tasks'>
            {tasks
              .filter((task) => task.finished === false)
              .map((task) => (
                <UnfinishedTask
                  task={task}
                  onToggleTask={onToggleTask}
                  onDeleteTask={onDeleteTask}
                  key={task.id}
                />
              ))}
          </ul>
        </div>
      ) : (
        <h1 className='message'>
          <span>😅</span>
          Nothing to see here, add a new task
        </h1>
      )}
    </>
  );
}

function FinishedTaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <div className='finished-task-list'>
      <ul className='tasks'>
        {tasks
          .filter((task) => task.finished === true)
          .map((task) => (
            <FinishedTask
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              key={task.id}
            />
          ))}
      </ul>
    </div>
  );
}

function UnfinishedTask({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className='unfinished-task'>
      <div className='task-checkbox'>
        <input
          type='checkbox'
          checked={task.finished}
          onChange={() => onToggleTask(task.id)}
        ></input>
        <label>{task.description}</label>
      </div>
      <button className='delete-btn' onClick={() => onDeleteTask(task.id)}>
        ❌
      </button>
    </li>
  );
}

function FinishedTask({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className='finished-task'>
      <div className='task-checkbox'>
        <input
          type='checkbox'
          checked={task.finished}
          onChange={() => onToggleTask(task.id)}
        ></input>
        <label>{task.description}</label>
      </div>
      <button className='delete-btn' onClick={() => onDeleteTask(task.id)}>
        ❌
      </button>
    </li>
  );
}

function Footer() {
  return (
    <footer className='footer'>
      © {new Date().getFullYear()} Nibelheim, Inc.
    </footer>
  );
}

export default App;
