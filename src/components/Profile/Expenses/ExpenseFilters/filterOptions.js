
const categoryOptions = [
    {value:"bank", label: "BANKING"},
    {value:"book", label: "BOOKS"},
    {value:"clo", label: "CLOTHING"},
    {value:"edu", label: "EDUCATION"},
    {value:"ent", label: "ENTERTAINMENT"},
    {value:"elec", label: "ELECTRONICS"},
    {value:"fash", label: "FASHION"},
    {value:"food", label: "FOOD"},
    {value:"gift", label: "GIFT"},
    {value:"gro", label: "GROCERY"},
    {value:"hh", label: "HOUSEHOLD"},
    {value:"jew", label: "JEWELRY"},
    {value:"misc", label: "MISCELLANEOUS"},
    {value:"med", label: "MEDICAL"},
    {value:"oth", label: "OTHER"},
    {value:"tra", label: "TRAVEL"}
]

const transactionTypeOptions = [
    {value:"cash", label: "CASH"},
    {value:"cc", label: "CREDIT CARD"},
    {value:"dc", label: "DEBIT CARD"},
    {value:"netb", label: "NET BANKING"},
    {value:"upi", label: "UPI"},
]

const amountOptions = [
    { value: 'a', label: 'ASCENDING'},
    { value: 'd', label: 'DESCENDING'}
]
   
export { categoryOptions, transactionTypeOptions, amountOptions }