import { useState, useEffect } from 'react'
import Persons from './components/Persons';
import Notification from './components/Notification';
import PersonForm from "./components/PersonForm";
import { FormInput } from "./components/PersonForm";
import phonesService from "./services/phones";

const App = () => {
  const [persons, setPersons] = useState([])
  const [notiMessage, setNotiMessage] = useState(null)
  const [notifType, setType] = useState("notif")

  useEffect(() => {
    phonesService
      .getAll()
      .then(data => {
        console.log("promise fulfilled");
        setPersons(data)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [])

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

    const findByName = persons.find(c => c.name === newName.trim())
    const findByNumber = persons.find(c => c.number === newNumber.trim())

    const newPhone = {
      name: newName.trim(),
      number: newNumber.trim(),
    }

    if (findByName) {
      // change number if name existed
      if (window.confirm(`${findByName.name} is already added to phonebook, replace the old number (${findByName.number}) with a new one`)) {
        phonesService
          .updatePhone(findByName.id, newPhone)
          .then(data => {
            setPersons(persons.map(c => c.name === findByName.name ? data : c))
            setNewName("")
            setNewNumber("")
            setType("notif")
            setNotiMessage(
              `Changed ${data.name}`
            )
            setTimeout(() => {
              setNotiMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error("Error update phone entry:", error);
          });
      }
      return
    } else if (findByNumber) {
      // change name if number existed
      if (window.confirm(`${findByNumber.number} is already added to phonebook, replace the old name (${findByNumber.number}) with a new one`)) {
        phonesService
          .updatePhone(findByNumber.id, newPhone)
          .then(data => {
            setPersons(persons.map(c => c.number === findByNumber.number ? data : c))
            setNewName("")
            setNewNumber("")
            setType("notif")
            setNotiMessage(
              `Changed ${data.name}`
            )
            setTimeout(() => {
              setNotiMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error("Error update phone entry:", error);
          });
      }
      return
    } else if (!newName || !newNumber) {
      alert(`please fill all inputs`)
      return
    }

    phonesService
      .create(newPhone)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName("")
        setNewNumber("")
        setType("notif")
        setNotiMessage(
          `Added ${data.name}`
        )
        setTimeout(() => {
          setNotiMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.error("Error creating new phone entry:", error);
      });
  }

  const numberToShow = filter === "" ? persons : persons.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

  const inputs = [
    { lable: "name", value: newName, onChangeFunc: handleNameInput },
    { lable: "number", value: newNumber, onChangeFunc: handleNumberInput },
  ]

  const deletePhone = id => {
    const phoneToDeleles = numberToShow.find(p => p.id === id)
    if (window.confirm(`Delete ${phoneToDeleles.name}`)) {
      console.log("delete", phoneToDeleles.id);
      phonesService
        .deletePhone(phoneToDeleles.id)
        .then(data => {
          const newPhones = persons.filter(p => p.id !== data.id)
          setPersons(newPhones)
        })
        .catch(error => {
          console.error("Error deleting phone entry:", error);
          setType("error")
          setNotiMessage(
            `Failed to delete`
          )
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage} type={notifType} />
      <FormInput input={{ lable: "filter shown with", value: filter, onChangeFunc: handleFilterInput }}></FormInput>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addNew} inputs={inputs}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={numberToShow} handleDelete={deletePhone}></Persons>
    </div>
  )
}

export default App