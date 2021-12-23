
const formatDate = (datestring) => {
    const date = new Date(datestring)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options)
}

export default formatDate