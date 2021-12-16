import React, {useEffect, useState} from 'react'
import Card from '../../UI/Card'
import './expenses.scss'


const ExpenseCardComponent = () => {

    const [imageExpanded, setImageExpanded] = useState('')
    const singleData = {
        "id": 2,
        "title": "Watch",
        "amount": 1000,
        "date": "2021-12-05",
        "currency": "inr",
        "category": "fash",
        "description": "Fastrack Watch",
        "receiptImage": "https://support.avaza.com/wp-content/uploads/2019/03/ExpenseReceipt-1-1.jpg",
        "transactionType": "cash",
        "isActive": true,
        "createdAt": "2021-12-05T14:52:44.631005Z",
        "updatedAt": "2021-12-05T14:52:44.631038Z",
        "appUser": 2
    }

    const expandImage = () => {
        if (imageExpanded) setImageExpanded('')
        else setImageExpanded('expanded')
      

    }

    return (
        <div class="expense-expand-container">
            <Card>
                <div className={`expense-img-container ${imageExpanded}`}>
                    <img className="expense-img" src={singleData.receiptImage} onClick={expandImage}></img>
                </div>
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