import React, { useContext } from 'react'
import ExpenseKeyValue from './ExpenseKeyValue'
import formatDate from '../../../../utils/dateFormat'
import { categoryMap, transactionTypeMap } from './expenseUtils'
import SingleExpenseContext from '../../../../contextManager/ExpenseContext'
import AuthContext from '../../../../contextManager/AuthContextManager'
import { urlFormat } from '../../../../utils/urlFormat'

const ExpenseDisplay = (props) => {

    const authCtx = useContext(AuthContext)
    const expenseCtx = useContext(SingleExpenseContext)    
    const singleData = expenseCtx.singleExpense

    const deleteExpenseHandler = () => {

        const url = urlFormat('expenses/update-expense')
        const formData = new FormData()

        let selectedExpense = expenseCtx.singleExpense

        formData.append('id', selectedExpense.id)
        const headers = new Headers()
        headers.append('Authorization', `Token ${authCtx.token}`)

        const requestOptions = {
            method: "DELETE",
            body: formData,
            headers: headers
        }

        fetch(url, requestOptions)
            .then(res=>{
                if(res.status === 204) {
                    expenseCtx.expenseChangedHandler()
                    expenseCtx.selectedExpenseHandler({
                        id: null,
                        title: null,
                        amount: null,
                        date :null,
                        category: null,
                        transactionType: null,
                        description: null,
                        currency: null,
                        receiptImage: null,
                    })
                }
            })
            .catch(err=>err)
    }

    return (
        (singleData.id)?
        <React.Fragment>
            <div className="ee-title">
                <p style={{ margin: "unset"}}>{singleData.title} </p>
            </div>
            <div className="expense-expand-inner-container">
                <span style={{width:"100%", display: "inline-block"}}>
                    <div className="ee-amount">
                        <p style={{ margin: "unset", marginTop:"5px"}}> ₹ {singleData.amount} </p>
                    </div>
                </span>

                <ExpenseKeyValue fieldname="DATE" val={formatDate(singleData.date)} />
                <ExpenseKeyValue fieldname="CATEGORY" val={categoryMap[singleData.category]} />
                <ExpenseKeyValue fieldname="PAYMENT MODE" val={transactionTypeMap[singleData.transactionType]} />
                <ExpenseKeyValue fieldname="DESCRIPTION" val={singleData.description} />
                <ExpenseKeyValue 
                    fieldname="IMAGE" 
                    val={singleData.receiptImage? "Click to open image": "No image"} 
                    onClick={
                    ()=>{
                        props.onClickExpandImage(singleData.receiptImage)
                    }
                }/>
            <button type="button" className="expense-form-submit discard" onClick={deleteExpenseHandler}>DELETE</button>
            <button type="button" className="expense-form-submit" onClick={()=>props.setEditMode(true)}>EDIT</button>
            </div>
        </React.Fragment>:
        <React.Fragment />
    )
}

export default ExpenseDisplay