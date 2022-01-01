
const FilterAmountSelectStyle = {
    container: (provided, state) => (
        {   
            ...provided,
            fontSize: "0.8em",
            fontFamily: 'Futura',
            border: 'none',
            width: "100%",
        }
    ),
    control: (provided,state) => (
        {   
            ...provided,
            border: '1px solid #23395d',
            boxShadow: 'none',
            borderRadius: 'none',
            minHeight: "20px",
            height: "20px",
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
            cursor: "pointer",
            color: 'black',
            backgroundColor: isFocused ? "#d6d6d6" :"white",
            transition: "0.5s"
        }
    ),
    indicatorSeparator: () => null, 
    valueContainer: (provided, state) => ({
        ...provided,
        height: '20px',
        padding: '0 6px'
      }),
  
      input: (provided, state) => ({
        ...provided,
        margin: '0px',
        color: "transparent",
      }),
      indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '20px',
      }),
}



const CategoryFilterSelectStyle = {
    container: (provided, state) => (
        {   
            ...provided,
            fontSize: "1em",
            fontFamily: 'Futura',
            border: 'none',
            width: "100%",
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
            cursor: "pointer",
            backgroundColor: isFocused ? "#d6d6d6" :"none",
            transition: "0.5s"
        }
    ),
    indicatorSeparator: () => null, 
}


export { CategoryFilterSelectStyle, FilterAmountSelectStyle }