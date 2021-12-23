import React from 'react'

const ExpenseKeyValue = (props) => {
    let isImage = props.isImage

    return (
        <div className="ee-info">
            <div className="expense-field">
                <p style={{ margin: "unset", width:"fit-content"}}> {props.keyname} </p>
            </div>
            <div className="expense-value" onClick={props.onClick}>
                <p style={{ margin: "unset", cursor: (isImage)?"pointer":"", textDecoration: (isImage)?"underline":""}}> {props.val} </p>
            </div>
        </div>
    )
}

export default ExpenseKeyValue