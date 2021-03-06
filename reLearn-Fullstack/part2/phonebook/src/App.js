import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios'
import personServices from './Sercives/personServices'
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [SussMessage,setSussMessage] = useState(null)
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const servicesCompontent = () => {
    personServices
     .getAll()
     .then(response => {
       setPersons(response)
     })
  }
  useEffect(() => {
    servicesCompontent()
    // personServices
    //   .getAll()
    //   .then(initilaPerson => {
    //     setPersons(initilaPerson)
    //     console.log(initilaPerson)
    //   })
  }, [])
  const NotificationError = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="errorMessage">{message}</div>;
  };
  const Notificationsucc = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="sussMeaagae">{message}</div>;
  };
  const addPerson = (event) => {
    event.preventDefault();
    const Object = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };
    
    const person = persons.find(person => { 
      return person.name === Object.name && person.number !== Object.number
    })//找到的符合更新条件的person
    if(person){
      console.log("person",person)
      isUpdate({...Object,id: person.id})
      return 
    }
    let flag = 0;
    persons.forEach((person) => {
      if (person.name === newName) flag = 1;
    });
    if (flag === 0) {
      axios
        .post('http://localhost:3001/persons', Object)
        .then(response => {
          setPersons(persons.concat(response.data))
          console.log("object", Object)
          setNewName('')
          setNewPhone('')
        })
        setSussMessage(`${newName}'s phone is ${newPhone} , this perple be added`)
        setTimeout(() => {
          setSussMessage(null)
        },5000)
    } else {
      setErrorMessage(`${newName} has been added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    setFilterName(filterName.concat(filterName));
  };
  const isUpdate = (person) => {
    let flag = window.confirm(`${person.name} is already exits,replace the old number with the new one?`)
    console.log("person", person)
    if(flag === true){
      personServices
       .update(person)  //此时的参数person的值为Object（后输入的信息）
       .then(() => {
         servicesCompontent()
       })
      // axios
      //  .put(`http://localhost:3001/persons/${person.id}`,person)
      //  .then(() => {
      //    personServices
      //     .getAll()
      //     .then(person => setPersons(person))
      //  })
    }
    
  }
  const handleClickName = (event) => {
    setNewName(event.target.value);
  };
  const handleClickPhone = (event) => {
    setNewPhone(event.target.value);
  };
  const handClickFilter = (event) => {
    setFilterName(event.target.value);
  };
  const deletePerson = (person) => {
    const isDelete = window.confirm(`Delete ${person.name} ?`)
    if (isDelete === true) {
      personServices
        .deleteOne(person.id)
        .then(() => {
          setSussMessage(`${person.name} has been delete`)
          setTimeout(() => {
            setSussMessage(null)
          },5000)
          servicesCompontent()
        })
      

      // axios
      //   .delete(`http://localhost:3001/persons/${person.id}`)
      //   .then(() => {
      //     personServices
      //       .getAll()
      //       .then(person => {
      //         setPersons(person)
      //       })
      //   })
    }
  }
  return (
    <div>
      <Notificationsucc message={SussMessage} />
      <h2 className="h2">Phonebook</h2>
      <div>
        filter shown with
        <input value={filterName} onChange={handClickFilter} />
      </div>
      <h2 className="h2">add</h2>
      <form onSubmit={addPerson}>
        <div className="div">
          name: <input value={newName} onChange={handleClickName} />
        </div>
        <div>
          phoneNumber: <input value={newPhone} onChange={handleClickPhone} />
        </div>
        <div>
          <button type="submit" className="button">
            add
          </button>
        </div>
      </form>

      <h2 className="h2">Numbers</h2>
      {persons &&
        persons
          .filter((person) =>
            person.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
          )
          .map((person, i) => (
            <li key={i} className=" li">
              {" "}
              {person.name} {person.number}
              <button onClick={() => deletePerson(person)}>delete</button>
            </li>
          ))}
        <NotificationError message = {errorMessage}/>
    </div>
  );
};

export default App;
