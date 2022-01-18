import { getArrayForRange } from '../../utils/generalUtils'

const getYearOptions = () => {
    const currentYear = new Date().getFullYear()
    return getArrayForRange(currentYear-4, currentYear).reverse().map(year=>{
        return {value: year, label: year}
    })
}

export { getYearOptions }