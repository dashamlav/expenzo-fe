import './expenses.scss'

const CategorySelect = (props) => {

    return(
        <select className="expense-form-content" name="category" defaultValue={props.defaultValue}>
            <option value="bank">BANKING</option>
            <option value="book">BOOKS</option>
            <option value="clo">CLOTHING</option>
            <option value="edu">EDUCATION</option>
            <option value="ent">ENTERTAINMENT</option>
            <option value="elec">ELECTRONICS</option>
            <option value="fash">FASHION</option>
            <option value="food">FOOD</option>
            <option value="gift">GIFT</option>
            <option value="gro">GROCERY</option>
            <option value="hh">HOUSEHOLD</option>
            <option value="jew">JEWELRY</option>
            <option value="misc">MISCELLANEOUS</option>
            <option value="med">MEDICAL</option>
            <option value="oth">OTHER</option>
            <option value="tra">TRAVEL</option>
        </select>
    )
}

const PaymentModeSelect = (props) => {

    return(
        <select className="expense-form-content" name="paymentmode" defaultValue={props.defaultValue}>
            <option value="cash">CASH</option>
            <option value="cc">CREDIT CARD</option>
            <option value="dc">DEBIT CARD</option>
            <option value="netb">NET BANKING</option>
            <option value="upi">UPI</option>
        </select>
    )
}

export {CategorySelect, PaymentModeSelect}