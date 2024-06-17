/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
// Data Table
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Nav, NavDropdown, Row, Table } from "react-bootstrap"
import { getData } from "../../services/getData";
import { useNavigate } from "react-router";
import { faArrowDownLong, faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { setData } from "../../services/setData";
import category from "../../services/department";

function Home() {

    console.log("Home Run");

    let key = 0;

    const navigateTo = useNavigate();

    // Search
    const [search, setSearch] = useState('');
    // Dropdown
    const [menu, setMenu] = useState(category());
    // Submit State & Get Data
    const [tableData, setTableData] = useState(getData("database"));

    // Inputs Handle
    const handleInput = (e) => {

        e.preventDefault();

        setSearch(e.target.value);

        const data = getData("database");

        const searchData = data.filter((product) => product.empName.toLowerCase().includes(e.target.value.toLowerCase()))

        setTableData(searchData);
    }

    // Update Handle
    const handleUpdate = (id) => {
        navigateTo(`/updateProduct/${id}`);
    }

    // Delete Handle
    const handleDelete = (id) => {

        let record = tableData;
        let deletedRecord = record.filter((data) => data.id != id);

        setTableData(deletedRecord);
        setData("database", deletedRecord);
    }

    // onSubmit
    const handleSearch = (e) => {

        e.preventDefault();

        const data = getData("database");

        const searchData = data.filter((product) => {
            return product.empName.toLowerCase().includes(search.toLowerCase())
        })

        setTableData(searchData);
    }

    // Dropdown Fetch
    const handleFetch = (cat) => {

        const data = getData("database");

        const fetchedData = data.filter((singleCat) => {
            return singleCat.empDepartment == cat
        })

        setTableData(fetchedData);
    }

    // Sorting Handle
    const handleSort = (type, key) => {
        let sortedData;

        switch (type) {
            case "asc":
                sortedData = [...tableData].sort((p1, p2) => {
                    return p1[key].localeCompare(p2[key]);
                })
                break;

            case "dsc":
                sortedData = [...tableData].sort((p1, p2) => {
                    return p2[key].localeCompare(p1[key]);
                })
                break;
        }

        setTableData(sortedData);
    }

    // Dropdown
    useEffect(() => {
        setMenu(category());
        setTableData(getData("database"));
    }, []);

    // Set Data
    useEffect(() => {
        setData("database", tableData);
    }, []);

    return (
        <div>
            {/* Dropdown // Search Box */}
            <div className="d-flex flex-wrap justify-content-end w-100 p-3 item-center">
                <div className="d-flex">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <NavDropdown title="Dropdown">
                            {
                                menu.map((cat) => (
                                    <NavDropdown.Item className="capitalise" href="#action3" key={key++} onClick={() => handleFetch(cat)}>{cat}</NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>

                    {/* Search Box */}
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" name="search" value={search} onChange={handleInput} />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </div>
            </div>

            {/* Table */}
            <div className="table-wrapper boxshadow pt-2">
                <section className="tableFixHead">
                    <Table className="table" striped bordered hover>
                        <thead>
                            <tr>
                                <th>emp id</th>
                                <th>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Row className="d-flex flex-row flex-nowrap w-100">
                                            <Row className="d-flex w-50">
                                                <Col className="d-flex text-wrap">emp name</Col>
                                            </Row>
                                            <Row className="d-flex w-25 mx-3">
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-up" onClick={() => handleSort("asc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowUpLong} />
                                                    </Button>
                                                </Col>
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-down" onClick={() => handleSort("dsc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowDownLong} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Row className="d-flex flex-row flex-nowrap w-100">
                                            <Row className="d-flex w-50">
                                                <Col className="d-flex text-wrap">emp age</Col>
                                            </Row>
                                            <Row className="d-flex w-25 mx-3">
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-up" onClick={() => handleSort("asc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowUpLong} />
                                                    </Button>
                                                </Col>
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-down" onClick={() => handleSort("dsc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowDownLong} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </div>
                                </th>


                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Row className="d-flex flex-row flex-nowrap w-100">
                                            <Row className="d-flex w-50">
                                                <Col className="d-flex text-wrap">emp department</Col>
                                            </Row>
                                            <Row className="d-flex w-25 mx-3">
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-up" onClick={() => handleSort("asc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowUpLong} />
                                                    </Button>
                                                </Col>
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-down" onClick={() => handleSort("dsc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowDownLong} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </div>
                                </th>
                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Row className="d-flex flex-row flex-nowrap w-100">
                                            <Row className="d-flex w-50">
                                                <Col className="d-flex text-wrap">emp position</Col>
                                            </Row>
                                            <Row className="d-flex w-25 mx-3">
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-up" onClick={() => handleSort("asc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowUpLong} />
                                                    </Button>
                                                </Col>
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-down" onClick={() => handleSort("dsc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowDownLong} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </div>
                                </th>
                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Row className="d-flex flex-row flex-nowrap w-100">
                                            <Row className="d-flex w-50">
                                                <Col className="d-flex text-wrap">emp salary</Col>
                                            </Row>
                                            <Row className="d-flex w-25 mx-3">
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-up" onClick={() => handleSort("asc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowUpLong} />
                                                    </Button>
                                                </Col>
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-down" onClick={() => handleSort("dsc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowDownLong} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </div>
                                </th>
                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Row className="d-flex flex-row flex-nowrap w-100">
                                            <Row className="d-flex w-50">
                                                <Col className="d-flex text-wrap">emp email</Col>
                                            </Row>
                                            <Row className="d-flex w-25 mx-3">
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-up" onClick={() => handleSort("asc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowUpLong} />
                                                    </Button>
                                                </Col>
                                                <Col className="d-flex justify-content-end w-100">
                                                    <Button className="btn btn-down" onClick={() => handleSort("dsc", "empName")}>
                                                        <FontAwesomeIcon icon={faArrowDownLong} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </div>
                                </th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td className="capitalise">{row.empName}</td>
                                        <td>{row.empAge}</td>
                                        <td className="capitalise">{row.empDepartment}</td>
                                        <td className="capatalise">{row.empPosition}</td>
                                        <td className="capatalise">{row.empSalary}</td>
                                        <td className="capatalise">{row.empEmail}</td>
                                        <td className="d-flex justify-content-center flex-nowrap align-content-center align-items-center my-auto gap-2">
                                            {/* Button Update */}
                                            <Button className="btn btn-update" onClick={() => handleUpdate(row.id)}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>

                                            {/* Button - Delete */}
                                            <Button className="btn btn-delete">
                                                <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(row.id)} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </section>
            </div>
        </div>
    )
}

export default React.memo(Home);