import React from 'react'

const ExpenseKeyValue = (props) => {

    return (
        <div className="ee-info" key={props.keyname}>
            <div className="expense-field">
                <p style={{ margin: "unset", width:"fit-content"}}> {props.fieldname} </p>
            </div>
            <div className="expense-value" onClick={props.onClick}>
                <p 
                    style={{ margin: "unset", 
                            cursor: (props.fieldname==='IMAGE')?"pointer":"", 
                            textDecoration: (props.fieldname==='IMAGE')?"underline":"",
                            }}
                            > 
                    {props.val} 
                </p>
            </div>
        </div>
    )
}

export default ExpenseKeyValue