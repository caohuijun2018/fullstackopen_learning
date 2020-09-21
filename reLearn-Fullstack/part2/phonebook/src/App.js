import React, { useState  , useEffect} from "react";
import "./App.css";
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  useEffect(() => {
    axios
     .get('http://localhost:3001/persons')
     .then(response => {
       setPersons(response.data)
       console.log(response.data)
     })
  },[])
  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="errorMessage">{message}</div>;
  };
  const addPerson = (event) => {
    event.preventDefault();
    const Object = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };
    let flag = 0;
    persons.forEach((person) => {
      if (person.name === newName) flag = 1;
    });
    if (flag === 0) {
      setPersons(persons.concat(Object));
      console.log("object", Object);
      setNewName("");
      setNewPhone("");
    } else {
      setErrorMessage(`${newName} has been added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    setFilterName(filterName.concat(filterName));
  };
  const handleClickName = (event) => {
    setNewName(event.target.value);
  };
  const handleClickPhone = (event) => {
    setNewPhone(event.target.value);
  };
  const handClickFilter = (event) => {
    setFilterName(event.target.value);
  };
  return (
    <div>
      <Notification message={errorMessage} />
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
            person.name.toLowerCase().indexOf(filterName.toLowerCase() )!== -1
          )
          .map((person, i) => (
            <li key={i} className=" li">
              {" "}
              {person.name} {person.number}
            </li>
          ))}
    </div>
  );
};

export default App;
