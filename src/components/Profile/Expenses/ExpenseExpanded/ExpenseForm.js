import React, { useState, useRef, useContext, useEffect } from 'react'
import ExpenseKeyValue from './ExpenseKeyValue'
import { urlFormat } from '../../../../utils/urlFormat'
import AuthContext from '../../../../contextManager/AuthContextManager'
import SingleExpenseContext from '../../../../contextManager/ExpenseContext'
import Select from 'react-select'
import {categoryOptions, transactionTypeOptions} from '../ExpenseFilters/filterOptions'
import {ExpenseFormSelectStyle} from '../SelectStyles'

const ExpenseForm = (props) => {

    let todaysDate = new Date()
    todaysDate = todaysDate.toISOString().split('T')[0]

    const editMode = props.editMode

    const expenseCtx = useContext(SingleExpenseContext)
    const singleData = expenseCtx.singleExpense

    const [errorMsg, setErrorMsg] = useState(null)
    const [errorStatus, setErrorStatus] = useState(1000)
    const formElement = useRef(null)
    const authCtx = useContext(AuthContext)
    const categoryRef = useRef(null)
    const transactionTypeRef = useRef(null)

    const createExpense = (event) => {

        event.preventDefault()
        
        let title = event.target.title.value
        let amount = event.target.amount.value
        let date = event.target.date.value
        let description = event.target.description.value
        let category = categoryRef.current.getValue()[0].value
        let transactionType = transactionTypeRef.current.getValue()[0].value
        let receiptImage = event.target.image.files[0] || null
        

        if (!title) {
            setErrorStatus(1000)
            setErrorMsg('Title is required')
            setTimeout(()=>{
                setErrorMsg(null)
            }, 3000)
            return
        }
        if (!amount) {
            setErrorStatus(1000)
            setErrorMsg('Amount is required')
            setTimeout(()=>{
                setErrorMsg(null)
            }, 3000)
            return
        }
        if (amount<0) {
            setErrorStatus(1000)
            setErrorMsg('Amount cannot be negative')
            setTimeout(()=>{
                setErrorMsg(null)
            }, 3000)
            return
        }
        if (!date) {
            setErrorStatus(1000)
            setErrorMsg('Date is required')
            setTimeout(()=>{
                setErrorMsg(null)
            }, 3000)
            return
        }

        const url = urlFormat('expenses/create-expense')
        const formData = new FormData()
        formData.append('title', title)
        formData.append('amount', amount)
        formData.append('date', date)
        formData.append('category', category)
        formData.append('transactionType', transactionType)
        if (description) formData.append('description', description)
        if (receiptImage) formData.append('receiptImage', receiptImage)

        const headers = new Headers()
        headers.append('Authorization', `Token ${authCtx.token}`)

        const requestOptions = {
            method: "POST",
            body: formData,
            headers: headers
        }

        fetch(url, requestOptions)
            .then(res=>{
                if(res.status===201){
                    return res.json()
                } else {
                    setErrorStatus(res.status)
                    setErrorMsg("Something went wrong")
                    setTimeout(()=>{
                        setErrorMsg(null)
                    }, 3000)
                    return null
                }
            })
            .then((res)=>{
                if(res) {
                    formElement.current.reset()
                    setErrorStatus(201)
                    setErrorMsg("New record created successfully")
                    setTimeout(()=>{
                        setErrorMsg(null)
                    }, 3000)
                    expenseCtx.expenseChangedHandler()
                    const newExpense = {}
                    newExpense['id'] = res.id
                    for(let [key,val] of formData.entries()) {
                        newExpense[key] = val
                    }
                    expenseCtx.selectedExpenseHandler(newExpense)
                }
                
            })
            .catch(err=>setErrorMsg('Network Error'))

    }

    const updateExpense = (event) => {
        event.preventDefault()
        let title = event.target.title.value
        let amount = event.target.amount.value
        let date = event.target.date.value
        let description = event.target.description.value
        let category = categoryRef.current.getValue()[0].value
        let transactionType = transactionTypeRef.current.getValue()[0].value
        let receiptImage = event.target.image.files[0]

        const url = urlFormat('expenses/update-expense')
        const formData = new FormData()

        if (title && title !== singleData.title) formData.append('title', title)
        if (amount && amount != singleData.amount) formData.append('amount', amount)
        if (date && date !== singleData.date) formData.append('date', date)
        if (category && category !== singleData.category) formData.append('category', category)
        if (transactionType && transactionType !== singleData.transactionType) formData.append('transactionType', transactionType)
        if (description && description !== singleData.description) formData.append('description', description)
        if (receiptImage && receiptImage !== singleData.receiptImage) formData.append('receiptImage', receiptImage)

       if (formData.entries().next().done) {
           setErrorStatus(350)
           setErrorMsg('No changes detected')
           setTimeout(()=>{
               setErrorMsg(null)
           }, 3000)
        return

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
            .then(res=>{
                if(res.status === 200) {
                    return res.json()
                } else {
                    setErrorStatus(res.status)
                    setErrorMsg("Something went wrong")
                    setTimeout(()=>{
                        setErrorMsg(null)
                    }, 3000)
                    return null
                }
            })
            .then((res)=>{
                if(res) {
                    setErrorStatus(200)
                    setErrorMsg("Record updated successfully")
                    setTimeout(()=>{
                        setErrorMsg(null)
                    }, 3000)
                    
                    const selectedExpense = expenseCtx.singleExpense
                    
                    for(let [key,val] of formData.entries()) {
                        selectedExpense[key] = val
                    }
                    selectedExpense['receiptImage'] = res.receiptImage
                    expenseCtx.selectedExpenseHandler(selectedExpense)
                    expenseCtx.expenseChangedHandler()
                }
            })
            .catch(err=>console.log(err))
    }
    return(
        <form onSubmit={editMode?updateExpense:createExpense} ref={formElement}>
            <div className="ee-title" key={editMode?`${singleData.title}{Math.random()}`:""}>
                    <textarea 
                        id="expense-title-textarea" 
                        name="title"
                        className="expense-form-content" 
                        placeholder="Enter title here..."
                        defaultValue= {editMode?singleData.title:""}
                        maxLength="50"
                        autoComplete="off"
                        >
                    </textarea>
            </div>
            <div className="expense-expand-inner-container">
                <span style={{width:"100%", display: "inline-block"}}>
                    <div className="ee-amount" key={editMode?`${singleData.amount}{Math.random()}`:""}>
                        <input 
                            type="number"
                            id="expense-amount-input"
                            name="amount"
                            className="expense-form-content"
                            placeholder="₹..."
                            defaultValue= {editMode?singleData.amount:""}
                            autoComplete="off"
                            style={{width:"100%", letterSpacing:"5px"}}
                        >
                                
                        </input>
                    </div>
                </span>

                <ExpenseKeyValue keyname={editMode?`${singleData.date}{Math.random()}`:""} fieldname="DATE" val={
                    <input 
                        className="expense-form-content" 
                        type="date"
                        name='date'
                        defaultValue= {editMode?singleData.date:todaysDate}
                        placeholder="DD/MM/YYYY"
                        >
                    </input>
                } />
                <ExpenseKeyValue keyname={editMode?`${singleData.category}{Math.random()}`:""} fieldname="CATEGORY" val={ 
                        <Select
                            options={categoryOptions}
                            styles={ExpenseFormSelectStyle}
                            placeholder="Select category"
                            defaultValue={
                                editMode?
                                categoryOptions.filter((obj)=>obj.value===singleData.category):
                                categoryOptions[14]
                            }
                            ref={categoryRef}
                        >       
                        </Select>
                    
                } />
                <ExpenseKeyValue keyname={editMode?`${singleData.transactionType}{Math.random()}`:""} fieldname="PAYMENT MODE" val={
                    <Select
                        options={transactionTypeOptions}
                        styles={ExpenseFormSelectStyle}
                        placeholder="Select payment mode"
                        defaultValue={
                            editMode?
                            transactionTypeOptions.filter((obj)=>obj.value===singleData.transactionType):
                            transactionTypeOptions[0]
                        }
                        ref={transactionTypeRef}
                    >     
                    </Select>
                } />
                <ExpenseKeyValue keyname={editMode?`${singleData.description}{Math.random()}`:""} fieldname="DESCRIPTION" val={
                    <textarea 
                        id="expense-description-textarea" 
                        className="expense-form-content"
                        name="description"
                        defaultValue= {editMode?singleData.description:""}
                        maxLength="1000"
                        >
                    </textarea>
                } />
                <ExpenseKeyValue 
                    keyname={editMode?`${singleData.receiptImage}{Math.random()}`:""}
                    fieldname="IMAGE" 
                    val={
                            
                        <input 
                            id="expense-file-input" 
                            type="file"
                            name="image"
                            className="expense-form-content"
                            accept=".pdf, .jpg, .png, .jpeg"
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
                setErrorMsg(null)

            }}
            >
            DISCARD
        </button>
        <button type="submit" className="expense-form-submit">SAVE</button>
            </div>
        
        {(errorMsg) 
        && 
        <legend 
            className={`expense-error-text ${(errorStatus<300) ? 'success-green' : errorStatus>=300 && errorStatus<400? 'alert-orange' : ''}`}>{errorMsg}
        </legend>}
        </form>
    )
}

export default ExpenseForm