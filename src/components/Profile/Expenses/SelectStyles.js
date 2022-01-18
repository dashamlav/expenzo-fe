
const FilterSelectStyle = {
    container: (provided, state) => (
        {   
            ...provided,
            fontSize: "1em",
            fontFamily: 'Futura',
            border: 'none',
            width: "100%",
            marginRight: "1em"
        }
    ),
    control: (provided,state) => (
        {   
            ...provided,
            border: '1px solid #23395d',
            boxShadow: 'none',
            borderRadius: 'none',
            "&:hover":{
                color: "#23395d"
            }
        }
    ),
    dropdownIndicator: (provided, state) => (
        {
            ...provided,
            color: '#23395d',
            cursor: 'pointer',
        }
    ),
    multiValueRemove: (provided, state) => (
        {
            ...provided,
            cursor: 'pointer',
            "&:hover":{
                backgroundColor: "grey",
                color: "black"
            }
        }
    ),
    clearIndicator:(provided, state) => (
        {
            ...provided,
            color: '#23395d',
            cursor: 'pointer',
        }
    ),
    option: (provided, { isFocused }) => (
        {
            ...provided,
            borderRadius: "3px",
            color: "black",
            cursor: "pointer",
            backgroundColor: isFocused ? "#d6d6d6" :"white",
            transition: "0.5s"
        }
    ),
    indicatorSeparator: () => null, 
}

const ExpenseFormSelectStyle = {
    container: (provided, state) => (
        {   
            ...provided,
            fontSize: "0.9em",
            border: 'none',
            // width: "100%",
        }
    ),
    control: (provided,state) => (
        {   
            ...provided,
            border: '1px solid #23395d',
            boxShadow: 'none',
            borderRadius: 'none',
            height: "25px",
            minHeight:"25px",
            width: "100%",
            "&:hover":{
                color: "#23395d"
            }
        }
    ),
    dropdownIndicator: (provided, state) => (
        {
            ...provided,
            color: '#23395d',
            cursor: 'pointer',
        }
    ),
    option: (provided, { isFocused }) => (
        {   
            ...provided,
            borderRadius: "3px",
            color: "black",
            cursor: "pointer",
            backgroundColor: isFocused ? "#d6d6d6" :"white",
            transition: "0.5s",
        }
    ),
    indicatorSeparator: () => null, 
    input: (provided, state) => (
        {
            ...provided,
            margin: "0px",
            height: "25px",
        }
    ),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '25px',
        padding: '0 6px',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '25px',
    }),
    menu: (provided, state) => (
        {
            ...provided,
            width: "max-content",
        }
    ),
    placeholder: (provided, state) => (
        {
            ...provided,
            lineHeight: "25px",
        }
    ),
    singleValue: (provided, state) => (
        {
            ...provided,
            lineHeight: "25px",
        }
    )
}


export { FilterSelectStyle, ExpenseFormSelectStyle }