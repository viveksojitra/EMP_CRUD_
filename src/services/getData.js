export const getData = (key) => {
    const data = JSON.parse(localStorage.getItem(key))

    if(!data){
        return [];
    }
    
    return data;
}