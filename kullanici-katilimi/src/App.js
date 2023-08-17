import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [editingMember, setEditingMember] = useState();
  const [editingOrder, setEditingOrder] = useState();
  const initialMembers = [
    {
      name: "Ilgın",
      email: "ilgin@workintech.com.tr",
      pass: "Frontend Developer",
    },
    {
      name: "Segah",
      email: "segah@workintech.com.tr",
      pass: "Frontend Developer",
    },
    {
      name: "Elif",
      email: "elif@workintech.com.tr",
      pass: "Backend Developer",
    },
  ];

  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then(function (response) {
        setMembers(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function addMember(newMember) {
    axios
      .post("https://reqres.in/api/users", newMember)
      .then(function (response) {
        if (editingOrder !== undefined) {
          const updatedMembers = [...members];
          updatedMembers.splice(editingOrder, 1, response.data);
          setMembers(updatedMembers);
          setEditingOrder();
        } else {
          setMembers([...members, response.data]);
        }
        setEditingMember();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App App-header">
      <Form addMember={addMember} editMode={editingMember} />
    </div>
  );
}

export default App;