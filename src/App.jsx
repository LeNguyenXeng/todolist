import { Button, Form, InputGroup } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ListItem from "./Components/ListItem";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleClick = () => {
    const obj = {
      id: uuidv4(),
      name: name,
    };
    const newArray = [...data, obj];
    setData(newArray);
    localStorage.setItem("data", JSON.stringify(newArray));
    setName("");
  };

  const handleDelete = (id) => {
    if (confirm("Bạn có muốn xóa không?")) {
      const newItem = data.filter((item) => item.id !== id);
      setData(newItem);
      localStorage.setItem("data", JSON.stringify(newItem));
    }
  };

  const handleEdit = (id, value) => {
    setData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.id === id ? { ...item, name: value } : item
      );

      localStorage.setItem("data", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("data"));
    if (local) {
      setData(local);
    }
  }, []);
  return (
    <>
      <section className="vh-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-9">
              <div className="card mask-custom">
                <div className="card-body p-4 text-white">
                  <div className="text-center pt-3 pb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check"
                      width={60}
                    />
                    <h2 className="name my-4">To Do List</h2>
                    <InputGroup className="mb-3">
                      <Form.Control
                        value={name}
                        onChange={handleChangeName}
                        placeholder="Nhập tên..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button
                        variant="primary"
                        onClick={handleClick}
                        disabled={!name}
                      >
                        Thêm
                      </Button>
                    </InputGroup>
                  </div>
                  <table className="table text-white mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    {data.map((item) => (
                      <ListItem
                        key={item.id}
                        item={item}
                        handleDelete={handleDelete}
                        handleEdit={(id, value) => handleEdit(id, value)}
                      />
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
