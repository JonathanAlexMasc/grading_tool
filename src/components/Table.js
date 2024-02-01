import Table from 'react-bootstrap/Table';
import { FormControl, InputGroup, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import React from 'react';

function BootstrapTable({ addRow, deleteRow, data, setData }) {
    const inputRef = React.useRef(null);

    const [Submitter, setSubmitter] = useState('');
    const [Partner, setPartner] = useState('');
    const [Grade, setGrade] = useState('');

    const [sortColumn, setSortColumn] = useState('Submitter');
    const [sortDirection, setSortDirection] = useState('asc');

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const handleSubmitterChange = (e) => {
        setSubmitter(e.target.value);
    }

    const handlePartnerChange = (e) => {
        setPartner(e.target.value);
    }

    const handleGradeChange = (e) => {
        setGrade(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        inputRef.current.focus();
        addRow(Submitter, Partner, Grade);
        setSubmitter('');
        setPartner('');
        setGrade('');
    }

    const handleSort = (column) => {
        // Toggle sort direction if the same column is clicked
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }

        if (column === 'Submitter') {
            // Perform sorting
            const sortedData = (sortDirection === 'asc') ? (data.slice().sort((a, b) =>
                a.Submitter.toLowerCase() < b.Submitter.toLowerCase() ? -1 : 1)) : (data.slice().sort((a, b) =>
                    a.Submitter.toLowerCase() > b.Submitter.toLowerCase() ? -1 : 1)
            );
            setData(sortedData);
        }

        else if (column === 'Grades') {
            // Perform sorting
            const sortedData = (sortDirection === 'asc') ? (data.slice().sort((a, b) =>
                a.Grade < b.Grade ? -1 : 1)) : (data.slice().sort((a, b) =>
                    a.Grade > b.Grade ? -1 : 1)
            );
            setData(sortedData);
        }

        else {
            // Perform sorting
            const sortedData = (sortDirection === 'asc') ? (data.slice().sort((a, b) =>
                a.Partner.toLowerCase() < b.Partner.toLowerCase() ? -1 : 1)) : (data.slice().sort((a, b) =>
                    a.Partner.toLowerCase() > b.Partner.toLowerCase() ? -1 : 1)
            );
            setData(sortedData);
        }

    };

    const handleSearch = event => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);

        const filteredResults = (data.slice().filter(item =>
            item.Submitter.toLowerCase().includes(newSearchTerm.toLowerCase()) || item.Partner.toLowerCase().includes(newSearchTerm.toLowerCase())));

        if (newSearchTerm.length > 0) {
            setFilteredResults(filteredResults)
        }
        else {
            setFilteredResults(data);
        }

    };

    useEffect(() => {
        setFilteredResults(data);
    }, [data]);

    return (
        <>
            <Form className="d-flex flex-column">
                <h3>Search For Student</h3>
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="my-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}

                />
            </Form>
            <Form className="my-3" onSubmit={handleSubmit}>
                <h3>Add a Student</h3>
                <div className='d-flex gap-3'>
                    <InputGroup className="mb-3" ref={inputRef}>
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Submitter
                        </InputGroup.Text>
                        <Form.Control
                            ref={inputRef}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={handleSubmitterChange}
                            value={Submitter}
                        />
                    </InputGroup>
                    <br />
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default" >
                            Partner
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={handlePartnerChange}
                            value={Partner}
                        />
                    </InputGroup>
                    <br />
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default" >
                            Grade
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={handleGradeChange}
                            value={Grade}
                        />
                    </InputGroup>
                </div>
                <button className='btn btn-secondary'>Submit</button>
            </Form>

            <h3 className='mt-5'>List of Students</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Submitter<i className="fa-solid fa-sort mx-3" onClick={() => { handleSort('Submitter') }}></i></th>
                        <th>Partner<i className="fa-solid fa-sort mx-3" onClick={() => { handleSort('Partner') }}></i></th>
                        <th>Grader<i className="fa-solid fa-sort mx-3" onClick={() => { handleSort('Grades') }}></i></th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResults.map((row) => (
                        // console.log("row", row),
                        < tr key={row.id} >
                            <td>{row.Submitter}</td>
                            <td>{row.Partner}</td>
                            <td>{row.Grade}</td>
                            <td>
                                <Button>
                                    <i className="fa-solid fa-trash" onClick={() => deleteRow(row.id)}></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table >

        </>
    );
}

export default BootstrapTable;
