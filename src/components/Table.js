import Table from 'react-bootstrap/Table';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function BootstrapTable({ addRow, deleteRow, data, setData }) {

    const [Submitter, setSubmitter] = useState('');
    const [Partner, setPartner] = useState('');
    const [Grade, setGrade] = useState('');

    const [sortColumn, setSortColumn] = useState('Submitter');
    const [sortDirection, setSortDirection] = useState('asc');

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
            const sortedData = data.sort((a, b) =>
                a.Submitter.toLowerCase() < b.Submitter.toLowerCase() ? -1 : 1
            );
        }

        else {
            // Perform sorting
            const sortedData = data.sort((a, b) =>
                a.Partner.toLowerCase() < b.Partner.toLowerCase() ? -1 : 1
            );
        }

    };

    return (
        <>
            <Form className="my-3" onSubmit={handleSubmit}>
                <div className='d-flex gap-3'>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Submitter
                        </InputGroup.Text>
                        <Form.Control
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => { handleSort('Submitter') }}>Submitter</th>
                        <th onClick={() => { handleSort('Partner') }}>Partner</th>
                        <th>Grader</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
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
