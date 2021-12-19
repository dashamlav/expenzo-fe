import React, {useEffect, useState} from 'react'
import Card from '../../UI/Card'
import './expenses.scss'
import Tshirt from '../../../assets/images/shirt-solid.svg'
import MoneyIcon from '../../../assets/images/money-bill.svg'
import ExpenseKeyValue from './ExpenseKeyValue'


const ExpenseCardComponent = () => {

    const [imageExpanded, setImageExpanded] = useState('')
    const singleData = {
        "id": 2,
        "title": "Titan Watch",
        "amount": 1000,
        "date": "2021-12-05",
        "currency": "inr",
        "category": "Fashion",
        "description": "Light Leathers Watch with Blue Dial & Brown Leather Strap",
        "receiptImage": "http://68.media.tumblr.com/fc269dac2bf4a6b0614eb4bc63b0b0e4/tumblr_inline_oiw9qqCG6u1ucyvkf_540.png",
        "transactionType": "cash",
        "isActive": true,
        "createdAt": "2021-12-05T14:52:44.631005Z",
        "updatedAt": "2021-12-05T14:52:44.631038Z",
        "appUser": 2
    }

    return (
        
            
            <div class="expense-expand-container">
                <div className="ee-title">
                    <p style={{ margin: "unset"}}>{singleData.title} </p>
                </div>
                <div className="expense-expand-inner-container">
                    <span style={{width:"100%", display: "inline-block"}}>
                        <div className="ee-amount">
                            <p style={{ margin: "unset"}}> ₹ {singleData.amount} </p>
                        </div>
                    </span>

                    <ExpenseKeyValue keyname="Date" val={singleData.date} />
                    <ExpenseKeyValue keyname="Category" val={singleData.category} />
                    <ExpenseKeyValue keyname="Payment Type" val={singleData.transactionType} />
                    <ExpenseKeyValue keyname="Description" val={singleData.description} />
                    <ExpenseKeyValue keyname="Image" val={singleData.receiptImage} />
                </div>
            </div>
        
    )
}

export default ExpenseCardComponent