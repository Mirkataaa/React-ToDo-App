import { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";
import AddNewTaskModal from "./AddNewTaskModal";

export default function TodoList( ) {

    const[todos, setTodos] = useState([]);
    const [isPending , setIsPending] = useState(true);
    const [isNewTaskModalOpen , setNewTaskModalOpen] = useState(false);

    // * Fetch data with useEffect

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/todos')
            .then(res => res.json())
            .then(data => {
                const result = Object.values(data);
                setTodos(result);
                setIsPending(false);
            })
            .catch(err => {
                console.log(err.message);
                
            })
    } , []);


    const statusChangeHandler = (todoId) => {
        setTodos(oldTodos => oldTodos.map(todo => todo._id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo));
    }

    const handleNewTaskModal = () => {
        setNewTaskModalOpen(true);
      };

      const defaultData = {
        newTask: '',
        status: 'Incomplete'
      };

    const [formData , setFormData] = useState(defaultData);


      const handleCloseModal = () => {
        setNewTaskModalOpen(false);
      };
    
      const handleFormSubmit = (data) => {
        console.log(data);
        
        setFormData(data);
        handleCloseModal();
      };

  
    return (
        <>
           

                {/* <!-- Section container --> */}
                <section className="todo-list-container">
                    <h1>Todo List</h1>
                    {/* Add task button */}

                    <div className="add-btn-container">
                        <button onClick={handleNewTaskModal} className="btn">+ Add new Todo</button>
                    </div>

                    <AddNewTaskModal
                        isOpen={isNewTaskModalOpen}
                        modalData={formData}
                        onSubmit={handleFormSubmit}
                        onClose={handleCloseModal}
                    />
                
                    <div className="table-wrapper">

                        {/* <!-- Loading spinner - show the load spinner when fetching the data from the server--> */}
                        {isPending && (
                                <div className="loading-container">
                                <div className="loading-spinner">
                                    <span className="loading-spinner-text">Loading</span>
                                </div>
                                </div>
                        )}
                    

                        {/* <!-- Todo list table --> */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="table-header-task">Task</th>
                                    <th className="table-header-status">Status</th>
                                    <th className="table-header-action">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map(todo =>    
                                    <TodoListItem
                                    key = {todo._id}
                                    _id = {todo._id}
                                    text = {todo.text}
                                    isCompleted={todo.isCompleted}
                                    onStatusChange={statusChangeHandler}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
        </>
    );
}