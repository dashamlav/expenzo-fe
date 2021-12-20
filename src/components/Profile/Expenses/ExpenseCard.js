import React from 'react'
import styled from 'styled-components'
import './expenses.scss'

const ExpenseCard = styled.div`
    position: relative;
    display: flex;
    cursor: pointer;
    height: 70px;
    width: 80%;
    border-radius: 5px;
    padding: 10px 10px 10px 10px;
    margin: 7px auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    background: white;
    border: 2px solid #23395d;
    font-family:Futura;

    &:hover {
        background: #aaaaaa;
    }
`

const ExpenseCardLiteComponent = (props) => {
    
    const formatDate = (datestring) => {
        const date = new Date(datestring)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options)
    }

    return(
        <ExpenseCard onClick={props.onClick}>
            <p className="expense-title">{props.title}</p>
            <p className="expense-amount">₹ {props.amount}</p>
            <p className="expense-date">{formatDate(props.date)}</p>
        </ExpenseCard>
    )
}

export default ExpenseCardLiteComponent