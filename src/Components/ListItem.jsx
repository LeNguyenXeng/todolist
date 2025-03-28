import { Button, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../index.css";
function ListItem({ item, handleDelete, handleEdit }) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState(item.name);
  const [isFinished, setIsFinished] = useState(false);

  const handleUpdate = (event) => {
    setInputValue(event.target.value);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    handleEdit(item.id, inputValue);
    handleClose();
    setInputValue("");
  };
  const handleFinish = () => {
    setIsFinished(true);
  };
  return (
    <>
      <tbody>
        <tr className="fw-normal">
          <td className="w-80 border-0">
            <span className={isFinished ? "finish" : "mms-2"}>{item.name}</span>
          </td>
          <td className="border-0 align-middle">
            <a
              href="#!"
              data-mdb-tooltip-init
              title="Done"
              onClick={handleFinish}
            >
              <i className="fas fa-check fa-lg text-success me-3" />
            </a>
            <a
              href="#!"
              data-mdb-tooltip-init
              title="Done"
              onClick={handleShow}
            >
              <i className="fas fa-pen-to-square fa-lg text-primary me-3" />
            </a>

            <a
              href="#!"
              data-mdb-tooltip-init
              title="Remove"
              onClick={() => handleDelete(item.id)}
            >
              <i className="fas fa-trash-alt fa-lg text-danger" />
            </a>
          </td>
        </tr>
      </tbody>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={inputValue}
              onChange={handleUpdate}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ListItem;
