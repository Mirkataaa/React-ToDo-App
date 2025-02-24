import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

export default function AddNewTaskModal({
    onSubmit,
    modalData,
    isOpen,
    onClose
}) {

    const focusInputRef = useRef(null);
    const [formData , setFormData] = useState(modalData);

    useEffect(() => {
        if (isOpen && focusInputRef.current) {
          setTimeout(() => {
            focusInputRef.current.focus();
          }, 0);
        }
      }, [isOpen]);

      const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
      };

      const handleClose = () => {
        setFormData(modalData);
        onClose();
      };

    return (
       <Modal hasCloseBtn={true} isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newTask"></label>
                <input 
                    type="text"
                    id="newTask"
                    name="newTask"
                    value={FormData.newTask}
                    onChange={handleInputChange}
                    required
                />
                <div className="form-now">
                    <button type="submit">Submit</button>
                </div>
            </form>
       </Modal>
    );
}