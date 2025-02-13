import { useState } from 'react'

import Persons from './components/Persons';
import PersonForm from "./components/PersonForm";
import {FormInput} from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')  // control form input
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")

  const handleNameInput = e => {
    setNewName(e.target.value)
  }

  const handleNumberInput = e => {
    setNewNumber(e.target.value)
  }

  const handleFilterInput = e => {
    setFilter(e.target.value)
  }

  const addNew = e => {
    e.preventDefault()

    if (persons.find(c => c.name === newName)) {
      alert(`${newName} is already added to phone book`)
      return
    } else if (persons.find(c => c.number === newNumber)) {
      alert(`${newNumber} is already added to phone book`)
      return
    } else if (!newName || !newNumber) {
      alert(`please fill all inputs`)
      return
    }

    const newPhone = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPhone))
    setNewName("")
    setNewNumber("")
  }

  const numberToShow = filter === "" ? persons : persons.filter(c => c.name.includes(filter))

  const inputs = [
    {lable: "name", value: newName, onChangeFunc: handleNameInput},
    {lable: "number", value: newNumber, onChangeFunc: handleNumberInput},
  ]

  return (
    <div>
      <h2>Phonebook</h2>
      <FormInput input={{ lable: "filter shown with", value: filter, onChangeFunc: handleFilterInput }}></FormInput>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addNew} inputs={inputs}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={numberToShow}></Persons>
    </div>
  )
}

export default App