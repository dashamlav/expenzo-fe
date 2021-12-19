import React from 'react'

const ExpenseKeyValue = (props) => {

    return (
        <div className="ee-info">
            <div className="expense-field">
                <p style={{ margin: "unset", width:"fit-content"}}> {props.keyname} </p>
            </div>
            <div className="expense-value">
                <p style={{ margin: "unset"}}> {props.val} </p>
            </div>
        </div>
    )
}

export default ExpenseKeyValue