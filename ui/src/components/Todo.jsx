import React, { useEffect, useState } from "react";
import axios from "axios";

let id = sessionStorage.getItem("id");

function MyTodo() {
  const [inputs, setInputs] = useState({ body: "" });
  const [array, setArray] = useState([]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (inputs.body === "") {
      alert("Item can't be Empty");
    } else {
      if (id) {
        await axios
          .post(`http://localhost:8000/user/add`, {
            body: inputs.body, // Corrected from InputDeviceInfo.body to inputs.body
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        setInputs({ body: "" });
      } else {
        setArray({ ...array, inputs });
        setInputs({ body: "" });
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`http://localhost:8000/user/getTask/${id}`)
        .then((response) => {
          setArray(response.data.list);
        });
    };
    fetch();
  }, [submit]);

  return (
    <div className="m-2">
      <p className="text-center font-bold text-[2rem]">TODO</p>
      <div className="flex my-[4rem]">
        <div>
          <input
            type="text"
            placeholder="BODY"
            className="bg-gray-200 p-2 w-[70vw]"
            onChange={change}
            value={inputs.body}
            name="body"
          />
        </div>
        <div>
          <button
            className="bg-green-400 p-2 ml-1 w-[25vw] hover:bg-green-800 hover:text-white"
            onClick={submit}
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <ul>
          {array &&
            array.map((item, index) => (
              <li className="flex flex-col" key={index}>
                <div className="bg-gray-100 p-2">{item.body}</div>
                <div className="bg-gray-800 text-white">
                  {new Date(item.creatTime).toLocaleString()}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default MyTodo;
