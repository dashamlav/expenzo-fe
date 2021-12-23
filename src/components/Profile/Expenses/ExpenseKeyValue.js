import React from 'react'

const ExpenseKeyValue = (props) => {

    return (
        <div className="ee-info">
            <div className="expense-field">
                <p style={{ margin: "unset", width:"fit-content"}}> {props.keyname} </p>
            </div>
            <div className="expense-value" onClick={props.onClick}>
                <p 
                    style={{ margin: "unset", 
                            cursor: (props.keyname==='IMAGE')?"pointer":"", 
                            textDecoration: (props.keyname==='Image')?"underline":"",
                            // width:"max-content"
                            }}
                            > 
                    {props.val} 
                </p>
            </div>
        </div>
    )
}

export default ExpenseKeyValue