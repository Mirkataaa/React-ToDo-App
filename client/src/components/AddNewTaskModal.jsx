import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

export default function AddNewTaskModal({
    onSubmit,
    isOpen,
    onClose
}) {

    const focusInputRef = useRef(null);
    const [formData, setFormData] = useState({
        newTask: '',
    });

    // * Focus the input field.
    useEffect(() => {
        if (isOpen && focusInputRef.current) {
            focusInputRef.current.focus();
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3030/jsonstore/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: formData.newTask,
                    isCompleted: false
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            const newTask = await response.json();

            // ! Notify parent component about the new task

            if (onSubmit) {
                onSubmit(newTask);
            };

            setFormData({
                newTask: '',
            });
            onClose();
        } catch (error) {
            console.error("Error adding task:", error.message);

        }
    };

    const handleClose = () => {
        setFormData({
            newTask: '',
        });
        onClose();
    };

    return (
        <Modal hasCloseBtn={true} isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newTask"></label>
                <input
                    className="text-field"
                    ref={focusInputRef}
                    type="text"
                    id="newTask"
                    name="newTask"
                    value={formData.newTask}
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