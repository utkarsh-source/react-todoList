import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import {FaTimesCircle, FaPlus, FaCheckCircle} from 'react-icons/fa'

const Wrapper = styled.section`
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    background: linear-gradient(
    90deg,
    rgba(48, 16, 255, 1) 0%,
    rgba(100, 115, 255, 1) 100%
  );
    
`;

const Todo = styled.textarea`
    padding: 1rem 1.5rem;
    font-size: 1.6rem;
    color: white;
    width: 100%;
    resize: none;
    height: 100%;
    border-radius: 0.1rem;
    border: 0.2rem solid transparent;
    background-color: transparent;
    transition: 0.4s all;
    &::-webkit-scrollbar{
        display: none;
    }
    &:focus{
        outline: none;
        background-color: #161a2b;
        border: 0.2rem solid transparent;
        background-clip: padding-box;

    }
`

const Form = styled.form`
    position: relative;
    padding: 2.5rem;
    background: #161a2b;
    width: 50rem;
    border-radius: 0.8rem;
    @media screen and (max-width: 450px){
        &{
            width: 40rem;
        }
    }
    @media screen and (max-width: 300px){
        &{
            width: 35rem;
        }
    }
    &>h1{
        color: white;
        font-size: 1.6rem;
        margin-bottom: 1.3rem;
        text-align: center;
    }
    &>.inputBox{
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 5rem;
        border-radius: 0.4rem;
        overflow: hidden;
        margin: 3rem 0;
        background: linear-gradient(
                90deg,
                rgba(93, 12, 255, 1) 0%,
                rgba(155, 0, 250, 1) 100%
            );
        & >.addBtn{
            padding: 1rem 1.5rem;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            width: max-content;
            height: 100%;
            white-space: nowrap;
            background-color: transparent;
            &:focus{
                outline: none;
            }
        }
    }
    & >.todoRow{
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 1.2rem;
        border-radius: 0.4rem;
        overflow: hidden;
        height: max-content;
        background: linear-gradient(
            90deg,
            rgba(255, 118, 20, 1) 0%,
            rgba(255, 84, 17, 1) 100%
        );
                &:nth-child(4n + 1) {
        background: linear-gradient(
            90deg,
            rgba(93, 12, 255, 1) 0%,
            rgba(155, 0, 250, 1) 100%
        );
        }

            &:nth-child(4n + 2) {
            background: linear-gradient(
                90deg,
                rgba(255, 12, 241, 1) 0%,
                rgba(250, 0, 135, 1) 100%
            );
            }

            &:nth-child(4n + 3) {
            background: linear-gradient(
                90deg,
                rgba(20, 159, 255, 1) 0%,
                rgba(17, 122, 255, 1) 100%
            );
            }
    }
    `

const Input = styled.input`
    padding: 1rem 1.5rem;
    width: 100%;
    height: 100%;
    border: none;
    background-color: #161a2b;
    border: 0.25rem solid transparent;
    background-clip: padding-box;
    color: white;
    &:focus{
        outline: none;
    }
    &::placeholder{
        color: white;
    }
`
const sharedStyle = css`
    border: none;
    border-radius: 0.2rem;
    color: white;
    margin-left:0.3rem;
    height: 5rem;
    width: 5rem;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    font-weight: bolder;
    background-color: transparent;
    cursor: pointer;
    &:focus{
        outline: none;
    }
`

const Close = styled.button`
    ${sharedStyle}
`
const Edit = styled.button`
    ${sharedStyle}
    /* color: ${({ $edit }) => $edit && '#bbff00 !important'}; */
    margin-right: 1rem;
`

function TodoForm() {
    const [input, setInput] = useState('');
    const [todos, setTodo] = useState([{
        id: 42342,
        text: 'Hello, make sure todo !!',
        isEditing: false
        },
        {
        id: 23234,
        text: 'Todoing or not??',
        isEditing: false
    }]);
    const inputRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.length) return;
        const randomId = Math.floor(Math.random() * (10e6 - 1 + 1) + 1)
        setTodo(prev => [...prev, { id: randomId, text: input, isEditing: false}])
        setInput('')
    }
    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleRemove = (e) => {
        const target = e.target
        if (!target) return;
        const parent = target.closest('.todoRow');
        const removeArr = todos.filter(todo => todo.id !== +(parent.id))
        setTodo(removeArr)
    }
    const handleEdit = (e, todoId) => {
        const todoElem = e.target.closest('.todoRow').querySelector('.todo');
        if (!todoElem) return;
        todoElem.focus();
        setTodo(prev => prev.map(todo => todo.id === +todoId ? { ...todo, isEditing: !todo.isEditing } : todo))
        const isEditing = !todos.filter(todo => todo.id === +todoId)[0].isEditing
        if (!isEditing) {
            todoElem.blur();
        }
    }
    const handleTodo = (e) => {
        setTodo(prev => prev.map(todo => todo.id === +(e.target.id) ? {...todo, text : e.target.value} : todo))
    }
    useEffect(() => {
        inputRef.current.focus()
    }, [])
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <h1>What are you planning Today ??</h1>
                <div className="inputBox">
                    <Input ref={inputRef} type="text" placeholder="Add your Todo" onChange={handleChange} value={input} />
                    <button className='addBtn' type="submit">Add Todo</button>
                </div>
                {todos.map((todo) =>
                    <div key={todo.id} id={todo.id} className="todoRow">
                        <Todo className="todo" id={todo.id} value={todo.text} readOnly={todo.isEditing? false : true} onChange={todo.isEditing ?  handleTodo : undefined}/>
                        <Close className="remove" onClick={handleRemove}><FaTimesCircle/></Close>
                        <Edit className="edit" onClick={(e)=> handleEdit(e, todo.id)}>{todo.isEditing ? <FaCheckCircle/> : <FaPlus/>}</Edit>
                    </div>
                  )}
            </Form>
        </Wrapper>
    )
}

export default TodoForm
