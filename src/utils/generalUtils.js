
const getArrayForRange = (start,end) => {
    let arr = []
    for (let i=start; i<=end; i++ ) {
        arr.push(i)
    }
    return arr
}

const downloadStream = (blob, filename) => {
    // Using vanilla Javascript because don't want to use any library just for download

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

export { getArrayForRange, downloadStream }