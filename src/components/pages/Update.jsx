/* eslint-disable react-refresh/only-export-components */
// Update Form
import generateUniqueId from "generate-unique-id";
import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { getData } from "../../services/getData";
import { useNavigate } from "react-router";
import { useParams } from "react-router"
import { setData } from "../../services/setData";

function Update() {

    console.log("Update Run");

    // id With Fatched Data
    const { id } = useParams();

    const navigateTo = useNavigate();

    // Input State
    const [input, setInput] = useState({
        id: id,
        empName: '',
        empAge: '',
        empDepartment: '',
        empPosition: '',
        empSalary: '',
        empEmail: '',
    });

    // Submit State & Get Data
    const [tableData, setTableData] = useState(getData("database"));

    // Check Submit
    const [isSubmit, setIsSubmit] = useState(false);

    // Input Handle
    const handleInput = (event) => {

        const { name, value } = event.target;

        setInput({ ...input, [name]: value });
    }

    // Submit Handle
    const handleSubmit = (event) => {
        event.preventDefault();

        if (input.id) {
            setTableData(tableData.map((record) => {

                if (record.id === input.id) {
                    return { ...record, ...input }
                }
                else {
                    return record
                }
            }))
        } else {
            const idGen = {
                ...input,
                id: generateUniqueId({
                    length: 4,
                    useLetters: false,
                }),
            }

            setTableData([...tableData, idGen])
        }

        setIsSubmit(true);

        setInput({
            id: '',
            empName: '',
            empAge: '',
            empDepartment: '',
            empPosition: '',
            empSalary: '',
            empEmail: '',
        });
    };

    // Set Data
    useEffect(() => {
        setData("database", tableData);
    }, [tableData]);

    // Set Input Data
    useEffect(() => {
        const setInputData = tableData.find((product) => {
            return product.id == id
        })

        setInput(setInputData);
    }, [tableData, id])

    // Set Submit
    useEffect(() => {
        if (isSubmit) {
            navigateTo('/');
        }
    }, [isSubmit, navigateTo]);

    return (
        <>
            {/* Form */}
            <Container className="pt-5">
                <section className="pb-5 position-static" >
                    <Form className='form-wrapper boxshadow' onSubmit={handleSubmit}>
                        <Form.Control className="input" type="text" name='id' value={input.id} onChange={handleInput} hidden />

                        {/* title */}
                        <h1 className="title">Add Product</h1>

                        {/* row-1 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Name</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='empName' value={input.empName} placeholder='Name' onChange={handleInput} />
                        </Form.Group>

                        {/* row-2 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Age</Form.Label>
                            <Form.Control className="input" type="number" name='empAge' value={input.empAge} placeholder='Age' onChange={handleInput} />
                        </Form.Group>

                        {/* row-3 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Department</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='empDepartment' value={input.empDepartment} placeholder='Department' onChange={handleInput} />
                        </Form.Group>

                        {/* row-4 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Position</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='empPosition' value={input.empPosition} placeholder='Position' onChange={handleInput} />
                        </Form.Group>

                        {/* row-5 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Salary</Form.Label>
                            <Form.Control className="input capitalise" type="text" name='empSalary' value={input.empSalary} placeholder='Salary' onChange={handleInput} />
                        </Form.Group>

                        {/* row-6 */}
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="w-3">Email</Form.Label>
                            <Form.Control className="input" type="text" name='empEmail' value={input.empEmail} placeholder='Email' onChange={handleInput} />
                        </Form.Group>

                        {/* submit */}
                        <Button className="btn-submit d-flex mt-4 mx-auto" type="submit">
                            UPDATE
                        </Button>
                    </Form>
                </section>
            </Container>
        </>
    )
}

export default React.memo(Update);