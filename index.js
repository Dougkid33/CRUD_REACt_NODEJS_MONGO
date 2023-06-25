// config inicial
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// depois do db
const Person = require('./models/Person');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas
app.post('/person', async (req, res) => {
  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    await Person.create(person)

    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/person', async (req, res) => {
  try {
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/person/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.patch('/person/:id', async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.nModified === 0) {
      res.status(422).json({ message: 'Usuário não encontrado!' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

app.delete('/person/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await Person.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})



const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.jgvnepm.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000);
        console.log('Conectado ao banco de dados!');
    });
