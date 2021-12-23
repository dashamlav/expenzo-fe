import React, { useState } from 'react'
import styled from 'styled-components'
import './expenses.scss'
import useComponentVisible from '../../../utils/outsideClick'

const ExpenseCard = styled.div`
    position: relative;
    display: flex;
    cursor: pointer;
    height: 70px;
    width: 80%;
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    margin: 7px auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    border: 2px solid #23395d;
    font-family:Futura;
    background-color: ${props => (props.isActive ? '#aaaaaa' : 'white')};

    &:hover {
        background: #aaaaaa;
    }

`

const ExpenseCardLiteComponent = (props) => {
    
    const [ref, isActive, setIsActive] = useComponentVisible(false)

    const formatDate = (datestring) => {
        const date = new Date(datestring)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options)
    }

    return(
            <ExpenseCard isActive={isActive} ref={ref} onClick={
                () => {
                    setIsActive(true)
                    props.onClick()
                }} >
            <div className="expense-title-container">
                <p className="expense-title">{props.title}</p>
            </div>
            <div className="expense-details-container">
                <p className="expense-date">{formatDate(props.date)}</p>
                <p className="expense-amount">₹ {props.amount}</p>
            </div>
        </ExpenseCard>
    )
}

export default ExpenseCardLiteComponent