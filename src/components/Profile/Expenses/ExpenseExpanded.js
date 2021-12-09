import React from 'react'
import Card from '../../UI/Card'
import './expenses.scss'


const ExpenseCardComponent = () => {

    const singleData = {
        "id": 2,
        "title": "Watch",
        "amount": 1000,
        "date": "2021-12-05",
        "currency": "inr",
        "category": "fash",
        "description": "Fastrack Watch",
        "receiptImage": "http://localhost:8000/media/expense_files/receipt_TRC0Sr6.pdf",
        "transactionType": "cash",
        "isActive": true,
        "createdAt": "2021-12-05T14:52:44.631005Z",
        "updatedAt": "2021-12-05T14:52:44.631038Z",
        "appUser": 2
    }

    return (
        <div class="expense-expand-container">
            <Card>
                <p className="ee-title"> {singleData.title} </p>
                <p className="ee-title"> {singleData.amount} </p>
                <p className="ee-title"> {singleData.date} </p>
                <p className="ee-title"> {singleData.category} </p>
                <p className="ee-title"> {singleData.description} </p>
                <p className="ee-title"> {singleData.transactionType} </p>
            </Card>
        </div>
    )
}

export default ExpenseCardComponent