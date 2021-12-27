import React, { useState, useRef, useContext } from 'react'
import ExpenseKeyValue from './ExpenseKeyValue'
import { urlFormat } from '../../../../utils/urlFormat'
import AuthContext from '../../../../contextManager/AuthContextManager'
import SingleExpenseContext from '../../../../contextManager/ExpenseContext'
import { CategorySelect, PaymentModeSelect } from '../selectOptions'

const ExpenseForm = (props) => {

    const editMode = props.editMode

    const expenseCtx = useContext(SingleExpenseContext)
    const singleData = expenseCtx.singleExpense

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(null)
    const [date, setDate] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [ok, setOk] = useState(false)
    const formElement = useRef(null)
    const authCtx = useContext(AuthContext)

    const createExpense = (event) => {
        event.preventDefault()
        let description = event.target.description.value
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
        if (amount<0) {
            setErrorMsg('Amount cannot be negative')
            return
        }
        if (!date) {
            setErrorMsg('Date is required')
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
                setOk(true)
                setErrorMsg("New record created successfully")
                expenseCtx.expenseChangedHandler(true)
                setTimeout(()=>{
                    setErrorMsg(null)
                }, 3000)
            })
            .catch(err=>console.log(err))

    }

    const updateExpense = (event) => {
        event.preventDefault()
        let description = event.target.description.value
        let category = event.target.category.value
        let transactionType = event.target.paymentmode.value
        const url = urlFormat('expenses/update-expense')
        const formData = new FormData()

        if (title && title !== singleData.title) formData.append('title', title)
        if (amount && amount !== singleData.amount) formData.append('amount', amount)
        if (date && date !== singleData.date) formData.append('date', date)
        if (category && category !== singleData.category) formData.append('category', category)
        if (transactionType && transactionType !== singleData.transactionType) formData.append('transactionType', transactionType)
        if (description && description !== singleData.description) formData.append('description', description)

        if (!formData) {
            setErrorMsg('No changes detected')
            setTimeout(()=>{
                setErrorMsg(null)
            }, 3000)
        }

        formData.append('id', singleData.id)
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
                setOk(true)
                setErrorMsg("Record updated successfully")
                expenseCtx.expenseChangedHandler(true)
                let changedExpense = {}
                // console.log(formData)
                // formData.forEach((value,key)=>{
                //     changedExpense[key] = value
                // })
                // expenseCtx.selectedExpenseHandler(changedExpense)
                setTimeout(()=>{
                    setErrorMsg(null)
                }, 3000)
            })
            .catch(err=>console.log(err))
    }

    return(
        <form onSubmit={editMode?updateExpense:createExpense} ref={formElement}>
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
                        onChange = { (event) => {
                            setDate(event.target.value)
                            if(title && amount) setErrorMsg(null)
                        }}
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
                props.setEditMode(false)
                props.setNewMode(false)
                setTitle('')
                setAmount(null)
                setDate(null)
                setErrorMsg(null)

            }}
            >
            DISCARD
        </button>
        <button type="submit" className="expense-form-submit">SUBMIT</button>
            </div>
        
        {(errorMsg) && <legend className={`expense-error-text ${(ok) ? 'success-green' : ''}`}>{errorMsg}</legend>}
        </form>
    )
}

export default ExpenseForm