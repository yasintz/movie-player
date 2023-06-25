const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const dateToName = (date) =>{
    let d = new Date(date);
    return days[d.getDay()];
} 

export const dateToReadable = (date) =>{
    let d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
} 