import { getData } from "./getData"

const department = () => {
    
    const categoryRecord = getData("database");

    const categoryBox = categoryRecord.map((record) => {
        return record.empDepartment
    })

    const categoryList = new Set(categoryBox);

    return Array.from(categoryList);
}

export default department