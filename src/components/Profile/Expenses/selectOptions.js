import './expenses.scss'

const CategorySelect = () => {

    return(
        <select className="expense-form-content" name="expense-category-select">
            <option value="BANKING">BANKING</option>
            <option value="BOOKS">BOOKS</option>
            <option value="CLOTHING">CLOTHING</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="ENTERTAINMENT">ENTERTAINMENT</option>
            <option value="ELECTRONICS">ELECTRONICS</option>
            <option value="FASHION">FASHION</option>
            <option value="FOOD">FOOD</option>
            <option value="GIFT">GIFT</option>
            <option value="GROCERY">GROCERY</option>
            <option value="HOUSEHOLD">HOUSEHOLD</option>
            <option value="JEWELRY">JEWELRY</option>
            <option value="MISCELLANEOUS">MISCELLANEOUS</option>
            <option value="MEDICAL">MEDICAL</option>
            <option value="OTHER" selected="selected">OTHER</option>
            <option value="TRAVEL">TRAVEL</option>
        </select>
    )
}

const PaymentModeSelect = () => {

    return(
        <select className="expense-form-content" name="expense-paymentmode-select">
            <option value="CASH" selected="selected">CASH</option>
            <option value="CREDIT_CARD">CREDIT_CARD</option>
            <option value="DEBIT_CARD">DEBIT_CARD</option>
            <option value="NET_BANKING">NET_BANKING</option>
            <option value="UPI">UPI</option>
        </select>
    )
}

export {CategorySelect, PaymentModeSelect}