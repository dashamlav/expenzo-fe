import React, { useState, useContext, useRef } from 'react'
import './expenses.scss'
import ExpenseKeyValue from './ExpenseKeyValue'
import formatDate from '../../../utils/dateFormat'
import { CategorySelect, PaymentModeSelect } from './selectOptions'
import { urlFormat } from '../../../utils/urlFormat'
import AuthContext from '../../../contextManager/AuthContextManager'

const ExpenseExpandedComponent = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(null)
    const [errorMsg, setErrorMsg] = useState(title && amount)
 
    const singleData = props.singleExpenseData
    const authCtx = useContext(AuthContext)
    const formElement = useRef(null)

    const createExpense = (event) => {
        event.preventDefault()
        let date = event.target.date.value
        let description = event.target.title.value
        let category = event.target.category.value
        let transactionType = event.target.paymentmode.value
        
        if (!title) {
            setErrorMsg('Title is required')
            return
        }

        if (!amount) {
            setErrorMsg('Amount is required')
            return
        }

        const url = urlFormat('expenses/create-expense')
        const formData = new FormData()
        formData.append('title', title)
        formData.append('amount', amount)
        formData.append('date', date)
        formData.append('category', category)
        formData.append('transactionType', transactionType)
        formData.append('description', description)

        const headers = new Headers()
        headers.append('Authorization', `Token ${authCtx.token}`)

        const requestOptions = {
            method: "POST",
            body: formData,
            headers: headers
        }

        fetch(url, requestOptions)
            .then(res=>res.json())
            .then((res)=>{
                console.log(res)
                formElement.current.reset()
            })
            .catch(err=>console.log(err))

    }

    const updateExpense = (event) => {
        event.preventDefault()
    }
    return (
        
        <div className="expense-expand-container">
            {
                (props.newMode || editMode) ?

                //If edit mode, show form
                <form onSubmit={createExpense} ref={formElement}>
                    <div className="ee-title">
                        <textarea 
                            id="expense-title-textarea" 
                            name="title"
                            className="expense-form-content" 
                            placeholder="Enter title here..."
                            defaultValue= {editMode?singleData.title:""}
                            onChange = { (event) => {
                                setTitle(event.target.value)
                                setErrorMsg(null)
                            }}
                            >

                        </textarea>
                    </div>
                    <div className="expense-expand-inner-container">
                        <span style={{width:"100%", display: "inline-block"}}>
                            <div className="ee-amount">
                                <input 
                                    type="number"
                                    id="expense-amount-input" 
                                    name="amount"
                                    className="expense-form-content" 
                                    placeholder="₹..."
                                    defaultValue= {editMode?singleData.amount:""}
                                    onChange = { (event) => {
                                        setAmount(event.target.value)
                                        if(title) setErrorMsg(null)
                                    }}
                                    >
                                        
                                </input>
                            </div>
                        </span>

                        <ExpenseKeyValue keyname="DATE" val={
                            <input 
                                className="expense-form-content" 
                                type="date"
                                name='date'
                                defaultValue= {editMode?singleData.date:""}
                                >
                            </input>
                        } />
                        <ExpenseKeyValue keyname="CATEGORY" val={
                            <CategorySelect defaultValue={editMode?singleData.category:"oth"}></CategorySelect>
                        } />
                        <ExpenseKeyValue keyname="PAYMENT MODE" val={
                            <PaymentModeSelect defaultValue={editMode?singleData.transactionType:"cash"}></PaymentModeSelect>
                        } />
                        <ExpenseKeyValue keyname="DESCRIPTION" val={
                            <textarea 
                                id="expense-description-textarea" 
                                className="expense-form-content"
                                name="description"
                                defaultValue= {editMode?singleData.description:""}
                                >
                            </textarea>
                        } />
                        <ExpenseKeyValue 
                            keyname="IMAGE" 
                            val={
                                <input 
                                    id="expense-file-input" 
                                    type="file"
                                    name="image"
                                    className="expense-form-content"
                                    >
                                </input>
                            }
                        />
                <button 
                    type="button" 
                    className="expense-form-submit discard" 
                    onClick={()=>{
                        setEditMode(false)
                        props.setNewMode(false)
                    }}
                    >
                    DISCARD
                </button>
                <button type="submit" className="expense-form-submit">SUBMIT</button>
                    </div>
                
                {(errorMsg) && <legend className="expense-error-text">{errorMsg}</legend>}
                </form>:

                //Otherwise display clicked expense data
                <React.Fragment>
                    <div className="ee-title">
                        <p style={{ margin: "unset"}}>{singleData.title} </p>
                    </div>
                    <div className="expense-expand-inner-container">
                        <span style={{width:"100%", display: "inline-block"}}>
                            <div className="ee-amount">
                                <p style={{ margin: "unset"}}> ₹ {singleData.amount} </p>
                            </div>
                        </span>

                        <ExpenseKeyValue keyname="DATE" val={formatDate(singleData.date)} />
                        <ExpenseKeyValue keyname="CATEGORY" val={singleData.category.toUpperCase()} />
                        <ExpenseKeyValue keyname="PAYMENT MODE" val={singleData.transactionType.toUpperCase()} />
                        <ExpenseKeyValue keyname="DESCRIPTION" val={singleData.description} />
                        <ExpenseKeyValue 
                            keyname="IMAGE" 
                            val={singleData.receiptImage? "Click to open image": "No image"} 
                            onClick={
                            ()=>{
                                props.onClickExpandImage(singleData.receiptImage)
                            }
                        }/>
                    <button type="button" className="expense-form-submit" onClick={()=>setEditMode(true)}>EDIT</button>
                    </div>
                </React.Fragment> 

            }
        </div>
        
    )
}

export default ExpenseExpandedComponent