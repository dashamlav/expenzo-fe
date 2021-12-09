import React from 'react'
import ExpenseCardLiteComponent from './ExpenseCard'
import './expenses.scss'


const ExpenseListComponent = () => {

    const data = [
        {
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
        },
        {
            "id": 3,
            "title": "Potatoes",
            "amount": 100,
            "date": "2021-12-05",
            "currency": "inr",
            "category": "gro",
            "description": "2 kg potatoes",
            "receiptImage": null,
            "transactionType": "cash",
            "isActive": true,
            "createdAt": "2021-12-05T15:04:21.446103Z",
            "updatedAt": "2021-12-05T15:04:21.446130Z",
            "appUser": 2
        },
        {
            "id": 4,
            "title": "TV",
            "amount": 45000,
            "date": "2021-12-05",
            "currency": "inr",
            "category": "elec",
            "description": "MI TV 55 inch",
            "receiptImage": null,
            "transactionType": "netb",
            "isActive": true,
            "createdAt": "2021-12-05T15:05:07.748402Z",
            "updatedAt": "2021-12-05T15:05:07.748430Z",
            "appUser": 2
        },
        {
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
      },
      {
          "id": 3,
          "title": "Potatoes",
          "amount": 100,
          "date": "2021-12-05",
          "currency": "inr",
          "category": "gro",
          "description": "2 kg potatoes",
          "receiptImage": null,
          "transactionType": "cash",
          "isActive": true,
          "createdAt": "2021-12-05T15:04:21.446103Z",
          "updatedAt": "2021-12-05T15:04:21.446130Z",
          "appUser": 2
      },
      {
          "id": 4,
          "title": "TV",
          "amount": 45000,
          "date": "2021-12-05",
          "currency": "inr",
          "category": "elec",
          "description": "MI TV 55 inch",
          "receiptImage": null,
          "transactionType": "netb",
          "isActive": true,
          "createdAt": "2021-12-05T15:05:07.748402Z",
          "updatedAt": "2021-12-05T15:05:07.748430Z",
          "appUser": 2
      },
      {
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
    },
    {
        "id": 3,
        "title": "Potatoes",
        "amount": 100,
        "date": "2021-12-05",
        "currency": "inr",
        "category": "gro",
        "description": "2 kg potatoes",
        "receiptImage": null,
        "transactionType": "cash",
        "isActive": true,
        "createdAt": "2021-12-05T15:04:21.446103Z",
        "updatedAt": "2021-12-05T15:04:21.446130Z",
        "appUser": 2
    },
    {
        "id": 4,
        "title": "TV",
        "amount": 45000,
        "date": "2021-12-05",
        "currency": "inr",
        "category": "elec",
        "description": "MI TV 55 inch",
        "receiptImage": null,
        "transactionType": "netb",
        "isActive": true,
        "createdAt": "2021-12-05T15:05:07.748402Z",
        "updatedAt": "2021-12-05T15:05:07.748430Z",
        "appUser": 2
    }
    ]

    
    

    return(
        <div className="expense-list-wrapper">
          {
            data.map((singleExpense)=>{
              return (
                <ExpenseCardLiteComponent title={singleExpense.title} amount={singleExpense.amount} date={singleExpense.date}  />
              )
            })
          }
        </div>
    )
}

export default ExpenseListComponent