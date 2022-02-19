import styled from 'styled-components'


const LoadingSpinner = styled.div`
    display: inline-flex;
    align-self: center;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #23395d; 
    border-radius: 10em;
    width: 50px;
    height: 50px;
    animation: spin 1.5s linear infinite;
`

export default LoadingSpinner