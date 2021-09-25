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

    if(matrixType != "none") code += getFix(matrixType, true);
    for(let r = 0; r < numRows; r++) {
        for(let c = 0; c < numCols; c++) {
            code += data[r][c];
            if(c != numCols - 1) {
                code += " & ";
            }
        }
        code += " \\\\ \n";
    }
    if(matrixType != "none") code += getFix(matrixType, false);

    return code;
}

function Cell(props) {
    return (
        <input className=" " onFocus={(e) => e.target.select()} style={{
            width: "50px",
            height: "40px",
            fontSize: "14px"
        }} value={props.value} onChange={props.onChange}></input>
    );
}

function App() {
    const [numRows, setNumRows] = useState(3);
    const [numCols, setNumCols] = useState(3);
    const [matrixData, setMatrixData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [matrixType, setMatrixType] = useState("parentheses");
    const [rightAlign, setRightAlign] = useState(false);
    const [matrixName, setMatrixName] = useState("A");
    
    let tableData = [];
    for(let r = 0; r < numRows; r++) {
        let rowData = [<th className="text-end pe-3" onClick={() => {
            let dataCopy = [];
            for (var i = 0; i < matrixData.length; i++) {
                dataCopy[i] = matrixData[i].slice();
            }
            dataCopy[r] = new Array(numCols).fill('');
            setMatrixData(dataCopy);
        }} style={{width: "50px", height: "40px", cursor: "not-allowed"}}>{r + 1}</th>];
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

    let latexCode = convertToLatex(matrixData, numRows, numCols, matrixType + (rightAlign ? "_right" : ""));

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
                                <thead className="text-center" style={{fontSize: "0.9rem"}}>
                                    <tr>
                                        <th></th>
                                        {
                                            Array(numCols).fill(0).map((value, index) => {
                                                return <th style={{cursor: "not-allowed"}}className="pb-1" onClick={() => {
                                                    let dataCopy = [];
                                                    for (var i = 0; i < matrixData.length; i++) {
                                                        dataCopy[i] = matrixData[i].slice();
                                                    }
                                                    for(let r = 0; r < numRows; r++) {
                                                        dataCopy[r][index] = '';
                                                    }
                                                    setMatrixData(dataCopy);
                                                }}>{index+1}</th>
                                            })
                                        }
                                    </tr>
                                </thead>
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
                                    <option value="none">None</option>
                                </Form.Control>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Right Align" checked={rightAlign} onClick={(e) => {
                                        setRightAlign(e.target.checked);
                                    }}/>
                                </Form.Group>
                                <Button variant="success" className="mb-3" onClick = {() => {
                                    navigator.clipboard.writeText(latexCode);
                                }}>
                                    Copy LaTeX
                                </Button>
                                <Button className="mb-3" variant="danger" onClick = {() => {
                                    let dataCopy = [];
                                    for(let r = 0; r < numRows; r++) {
                                        dataCopy.push(new Array(numCols).fill(''));
                                    }
                                    setMatrixData(dataCopy);
                                }}>Clear Matrix</Button>
                                <hr/>
                                <Form className="d-flex mb-3">
                                    <Form.Label className="me-3 my-auto align-middle">Name: </Form.Label>
                                    <Form.Control type="input" value={matrixName} onChange={(e) => {
                                        setMatrixName(e.target.value)
                                    }} style={{width: "75px"}}/>
                                </Form>
                                <Button className="mb-3" variant="success" onClick = {() => {
                                    let dataCopy = [];
                                    for (var i = 0; i < matrixData.length; i++) {
                                        dataCopy[i] = matrixData[i].slice();
                                    }

                                    for(let r = 0; r < numRows; r++) {
                                        for(let c = 0; c < numCols; c++) {
                                            dataCopy[r][c] = matrixName + "_{" + (r + 1) + "" + (c + 1) + "}";
                                        }
                                    }

                                    setMatrixData(dataCopy);
                                }}>Set Indices</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6}>
                    <textarea readOnly className="d-block w-50 mx-auto" value={latexCode} 
                        style={{height: "300px", fontSize: "14px"}}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
