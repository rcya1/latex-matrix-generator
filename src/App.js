import './App.css';

import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function getFix(matrixType, isBeginning) {
    let code = "\\" + (isBeginning ? "begin" : "end") + "{";
    let tokens = matrixType.split('_');

    switch(tokens[0]) {
        case "parentheses":
            code += "pmatrix";
            break;
        case "brackets":
            code += "bmatrix";
            break;
        case "determinant":
            code += "vmatrix";
            break;
        case "ddeterminant":
            code += "Vmatrix";
            break;
    }
    if(tokens.length > 1) {
        if(tokens[1] == 'right') {
            code += "*}" + (isBeginning ? "[r]" : "");
        }
    }
    else {
        code += "}"
    }
    code += '\n';
    return code;
}

function convertToLatex(data, numRows, numCols, matrixType) {
    let code = "";

    // code += "\\begin{pmatrix}\n";
    code += getFix(matrixType, true);
    for(let r = 0; r < numRows; r++) {
        for(let c = 0; c < numCols; c++) {
            code += data[r][c];
            if(c != numCols - 1) {
                code += " & ";
            }
        }
        code += "\\\\ \n";
    }
    code += getFix(matrixType, false);

    return code;
}

function Cell(props) {
    return (
        <input className=" " onFocus={(e) => e.target.select()} style={{
            width: "50px",
            height: "40px",
            fontSize: "18px"
        }} value={props.value} onChange={props.onChange}></input>
    );
}

function App() {
    const [numRows, setNumRows] = useState(3);
    const [numCols, setNumCols] = useState(3);
    const [matrixData, setMatrixData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [matrixType, setMatrixType] = useState("parentheses");
    const [rightAlign, setRightAlign] = useState(false);
    
    let tableData = [];
    for(let r = 0; r < numRows; r++) {
        let rowData = [];
        for(let c = 0; c < numCols; c++) {
            rowData.push(<td>
                <Cell value={matrixData[r][c]} onChange={(e) => {
                    let dataCopy = [];
                    for (var i = 0; i < matrixData.length; i++) {
                        dataCopy[i] = matrixData[i].slice();
                    }
                    dataCopy[r][c] = e.target.value;
                    setMatrixData(dataCopy);
                }}/>
            </td>);
        }
        tableData.push(<tr>
            {rowData}
        </tr>);
    }

    function updateRows(newNumRows) {
        if(matrixData.length < newNumRows) {
            let dataCopy = [];
            for (var i = 0; i < matrixData.length; i++) {
                dataCopy[i] = matrixData[i].slice();
            }
            while(dataCopy.length < newNumRows) {
                dataCopy.push(new Array(numCols).fill(''));
            }
            setMatrixData(dataCopy);
        }
        setNumRows(newNumRows);
    }

    function updateCols(newNumCols) {
        if(matrixData[0].length < newNumCols) {
            let dataCopy = [];
            for (var i = 0; i < matrixData.length; i++) {
                dataCopy[i] = matrixData[i].slice();
                while(dataCopy[i].length < newNumCols) dataCopy[i].push("");
            }
            setMatrixData(dataCopy);
        }
        setNumCols(newNumCols);
    }

    return (
        <Container className="mb-5">
            <h1 className="text-center mt-3">LaTeX Matrix Generator</h1>
            <div className="w-50 mx-auto mt-5">
                <Form className="d-flex">
                    <Form.Label column sm={3} className="me-3 my-auto align-middle"><strong>Rows: </strong></Form.Label>
                    <Form.Control column sm={3} type="number" value={numRows} onChange={(e) => {
                        updateRows(parseInt(e.target.value));
                    }} style={{width: "200px"}} min="0" data-bind="value:replyNumber"/>
                    <Form.Group column sm={3} className="ms-3">
                        <Button variant="success" className="me-3" onClick={(e) => {
                            updateRows(numRows + 1);
                        }}>
                            Add
                        </Button>
                        <Button variant="danger" onClick={(e) => {
                            if(numRows > 0) setNumRows(numRows - 1);
                        }}>
                            Sub
                        </Button>
                    </Form.Group>
                </Form>
                <Form className="d-flex mt-3">
                    <Form.Label column sm={3} className="me-3 my-auto align-middle"><strong>Columns: </strong></Form.Label>
                    <Form.Control  column sm={3} type="number" value={numCols} onChange={(e) => {
                        updateCols(parseInt(e.target.value));
                    }} style={{width: "200px"}}/>
                    <Form.Group column sm={3} className="ms-3">
                        <Button variant="success" className="me-3" onClick={(e) => {
                            updateCols(numCols + 1);
                        }}>
                            Add
                        </Button>
                        <Button variant="danger" onClick={(e) => {
                            if(numCols > 0) updateCols(numCols - 1);
                        }}>
                            Sub
                        </Button>
                    </Form.Group>
                </Form>
            </div>
            <Row className="mx-auto mt-5">
                <Col xs={6}>
                    <Row>
                        <Col xs={9}>
                            <table className="mx-auto">
                                <tbody>
                                    {tableData}
                                </tbody>
                            </table>
                        </Col>
                        <Col xs={3}>
                            <div className="d-flex flex-column">
                                <Form.Control as="select" className="mb-3" value={matrixType} onChange={(e) => {
                                    setMatrixType(e.target.value);
                                }}>
                                    <option value="parentheses">Parentheses</option>
                                    <option value="brackets">Brackets</option>
                                    <option value="determinant">Determinant</option>
                                    <option value="ddeterminant">DDeterminant</option>
                                </Form.Control>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Right Align" checked={rightAlign} onClick={(e) => {
                                        setRightAlign(e.target.checked);
                                    }}/>
                                </Form.Group>
                                <Button className="mb-3" variant="danger" onClick = {() => {
                                    let dataCopy = [];
                                    for(let r = 0; r < numRows; r++) {
                                        dataCopy.push(new Array(numCols).fill(''));
                                    }
                                    setMatrixData(dataCopy);
                                }}>Clear Matrix</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6}>
                    <textarea readOnly className="d-block w-50 mx-auto" value={convertToLatex(matrixData, numRows, numCols, matrixType + (rightAlign ? "_right" : ""))} 
                        style={{height: "300px", fontSize: "14px"}}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
