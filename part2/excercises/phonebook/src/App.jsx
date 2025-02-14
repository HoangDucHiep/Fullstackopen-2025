import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons';
import PersonForm from "./components/PersonForm";
import {FormInput} from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("promise fullfilled");
        setPersons(response.data)
    })
  })



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