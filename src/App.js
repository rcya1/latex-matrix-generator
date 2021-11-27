import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const cellWidth = "5em";
const cellHeight = "3em";

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
        default:
            break;
    }
    if(tokens.length > 1) {
        if(tokens[1] === 'right') {
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

    if(matrixType.substring(0, 4) !== "none") code += getFix(matrixType, true);
    for(let r = 0; r < numRows; r++) {
        for(let c = 0; c < numCols; c++) {
            code += data[r][c];
            if(c !== numCols - 1) {
                code += " & ";
            }
        }
        code += " \\\\ \n";
    }
    if(matrixType.substring(0, 4) !== "none") code += getFix(matrixType, false);

    return code;
}

function Cell(props) {
    return (
        <input className=" " onFocus={(e) => e.target.select()} style={{
            width: cellWidth,
            height: cellHeight,
            fontSize: "1em"
        }} value={props.value} onChange={props.onChange}></input>
    );
}

function NumberSelector(props) {
    return (
        <Form className={"d-flex justify-content-center " + props.className}>
            <Form.Label column sm={2} className="me-3 my-auto align-middle"><strong>{props.name}: </strong></Form.Label>
            <Form.Control column sm={3} type="number" value={props.value} onChange={(e) => {
                props.updateValue(parseInt(e.target.value));
            }} style={{maxWidth: "5em"}} min="0" data-bind="value:replyNumber"/>
            <Form.Group column sm={3} className="ms-3 d-none d-md-inline-block">
                <Button variant="success" className="me-3" onClick={(e) => {
                    props.updateValue(props.value + 1);
                }}>
                    Add
                </Button>
                <Button variant="danger" onClick={(e) => {
                    if(props.value > 0) props.updateValue(props.value - 1);
                }}>
                    Sub
                </Button>
            </Form.Group>
        </Form>
    );
}

function App() {
    const [numRows, setNumRows] = useState(3);
    const [numCols, setNumCols] = useState(3);
    const [matrixData, setMatrixData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [matrixType, setMatrixType] = useState("parentheses");
    const [rightAlign, setRightAlign] = useState(true);
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
        }} style={{width: cellWidth, height: cellHeight, cursor: "not-allowed"}}>{r + 1}</th>];
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
            <h6 className="text-center mx-auto text-secondary">The LaTeX packages amsmath and mathtools are required to use generated code.</h6>
            <div className="w-50 mx-auto mt-3">
                <NumberSelector
                    name="Rows"
                    value={numRows}
                    updateValue={updateRows}
                />
                <NumberSelector
                    name="Cols"
                    value={numCols}
                    className="mt-2"
                    updateValue={updateCols}
                />
            </div>
            <hr className="w-50 mx-auto"/>
            <Row className="mx-auto my-5">
                <Col md={9} style={{overflowX: 'scroll'}} className="mb-4">
                    <table className="mx-auto mb-3">
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
                <Col md={3}>
                    <Card>
                        <Card.Header>
                            <h4 className="text-center font-weight-bold">Options</h4>
                        </Card.Header>
                        <Card.Body className="d-flex flex-column">
                            <Form.Control as="select" className="mb-3" value={matrixType} onChange={(e) => {
                                setMatrixType(e.target.value);
                            }}>
                                <option value="parentheses">Parentheses</option>
                                <option value="brackets">Brackets</option>
                                <option value="determinant">Determinant</option>
                                <option value="ddeterminant">DDeterminant</option>
                                <option value="none">None</option>
                            </Form.Control>
                            <Form.Group className="" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Right Align" checked={rightAlign} onClick={(e) => {
                                    setRightAlign(e.target.checked);
                                }}/>
                            </Form.Group>
                            <hr/>
                            <Button variant="success" className="mb-3 mx-auto" style={{maxWidth: "max(8em, 50%)"}} onClick = {() => {
                                navigator.clipboard.writeText(latexCode);
                            }}>
                                Copy LaTeX
                            </Button>{' '}
                            <Button className="mx-auto" style={{maxWidth: "max(8em, 50%)"}} variant="danger" block={false} onClick = {() => {
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
                                }} style={{maxWidth: "5em"}}/>
                            </Form>
                            <Button className="mx-auto" style={{maxWidth: "max(8em, 50%)"}} variant="success" block={false}  onClick = {() => {
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
                            <hr/>
                            <Button className="mx-auto" style={{maxWidth: "max(8em, 50%)"}} variant="success" block={false}  onClick = {() => {
                                let dataCopy = [];
                                for (var i = 0; i < matrixData[0].length; i++) {
                                    dataCopy.push([]);
                                    for(var j = 0; j < matrixData.length; j++) {
                                        dataCopy[i].push(matrixData[j][i]);
                                    }
                                }

                                let temp = numRows;
                                setNumRows(numCols);
                                setNumCols(temp);
                                setMatrixData(dataCopy);
                            }}>Transpose</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <textarea readOnly className="d-block w-50 mx-auto" value={latexCode} 
                    style={{height: "20em"}}/>
            </Row>
            <Row className="mt-5">
                <p>Made by <a href="https://github.com/Ryan10145/">Ryan Chang</a> with React.js and react-bootstrap</p>
            </Row>
        </Container>
    );
}

export default App;
