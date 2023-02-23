import React from "react";
import './MainPage.css'

import { Button, Container, Table } from "react-bootstrap";
import { format } from 'date-fns'




const MainPage = () => {

    
    return(
        <>
       <Container className="containerMain">
        <Button className="buttons">Month</Button>
        <Button className="buttons">Week</Button>
        <Button className="buttons">Day</Button>
        <br /><br />
        <Table>
            <thead>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
            </tbody>
        </Table>
        </Container>
        </>
    )
}

export default MainPage;