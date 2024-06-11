// Data Table
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { Button, Form, Nav, NavDropdown, Table } from "react-bootstrap"
import { getData } from "../../services/getData";
import { useNavigate } from "react-router";
import { faArrowDownLong, faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { setData } from "../../services/setData";
import category from "../../services/department";

function Home() {

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
                                <th className="d-flex justify-content-center align-items-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div>emp name</div>
                                        <div className="btn-sort position-absolute end-0">
                                            <Button className="btn btn-up" onClick={() => handleSort("asc", "empName")}>
                                                <FontAwesomeIcon icon={faArrowUpLong} />
                                            </Button>
                                            <Button className="btn btn-down" onClick={() => handleSort("dsc", "empName")}>
                                                <FontAwesomeIcon icon={faArrowDownLong} />
                                            </Button>
                                        </div>
                                    </div>
                                </th>
                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div>emp age</div>
                                        <div className="btn-sort position-absolute end-0">
                                            <Button className="btn btn-up" onClick={() => handleSort("asc", "empAge")}>
                                                <FontAwesomeIcon icon={faArrowUpLong} />
                                            </Button>
                                            <Button className="btn btn-down" onClick={() => handleSort("dsc", "empAge")}>
                                                <FontAwesomeIcon icon={faArrowDownLong} />
                                            </Button>
                                        </div>
                                    </div>
                                </th>


                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div>emp department</div>
                                        <div className="btn-sort position-absolute end-0">
                                            <Button className="btn btn-up" onClick={() => handleSort("asc", "empDepartment")}>
                                                <FontAwesomeIcon icon={faArrowUpLong} />
                                            </Button>
                                            <Button className="btn btn-down" onClick={() => handleSort("dsc", "empDepartment")}>
                                                <FontAwesomeIcon icon={faArrowDownLong} />
                                            </Button>
                                        </div>
                                    </div>
                                </th>
                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div>emp position</div>
                                        <div className="btn-sort position-absolute end-0">
                                            <Button className="btn btn-up" onClick={() => handleSort("asc", "empPosition")}>
                                                <FontAwesomeIcon icon={faArrowUpLong} />
                                            </Button>
                                            <Button className="btn btn-down" onClick={() => handleSort("dsc", "empPosition")}>
                                                <FontAwesomeIcon icon={faArrowDownLong} />
                                            </Button>
                                        </div>
                                    </div>
                                </th>
                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div>emp salary</div>
                                        <div className="btn-sort position-absolute end-0">
                                            <Button className="btn btn-up" onClick={() => handleSort("asc", "empSalary")}>
                                                <FontAwesomeIcon icon={faArrowUpLong} />
                                            </Button>
                                            <Button className="btn btn-down" onClick={() => handleSort("dsc", "empSalary")}>
                                                <FontAwesomeIcon icon={faArrowDownLong} />
                                            </Button>
                                        </div>
                                    </div>
                                </th>
                                <th >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div>emp email</div>
                                        <div className="btn-sort position-absolute end-0">
                                            <Button className="btn btn-up" onClick={() => handleSort("asc", "empEmail")}>
                                                <FontAwesomeIcon icon={faArrowUpLong} />
                                            </Button>
                                            <Button className="btn btn-down" onClick={() => handleSort("dsc", "empEmail")}>
                                                <FontAwesomeIcon icon={faArrowDownLong} />
                                            </Button>
                                        </div>
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

export default Home