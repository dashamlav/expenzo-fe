import React from 'react'

const ExpenseKeyValue = (props) => {

    return (
        <div className="ee-info" key={props.keyname}>
            <div className="expense-field">
                <p style={{ margin: "unset", width:"fit-content"}}> {props.fieldname} </p>
            </div>
            <div className="expense-value" onClick={props.onClick}>
                <div
                    style={{cursor: (props.fieldname==='IMAGE')?"pointer":"", 
                            textDecoration: (props.fieldname==='IMAGE')?"underline":"",
                            // display:"inline-flex",
                            width: "100%"
                    }}
                > 
                    {props.val} 
                </div>
            </div>
        </div>
    )
}

export default ExpenseKeyValue