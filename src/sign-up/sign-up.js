import React, { useState, useEffect } from "react";
import { Card } from 'primereact/card';
import { Row, Col, Container } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import "../../Style/SignUp.css"; // Assuming this is the correct path

// Assuming SignUpUtil contains a function signUpNewUser
import SignUpUtil from "./service"; 

function SignUpComposer() {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cnfpassword, setCnfPassword] = useState('');
    const registration = () => {
        if(name && email && password){
            if((password === cnfpassword)){
                let user = {
                    userName : name,
                    email : email,
                    password : password
                }
                SignUpUtil.signUpNewUser(user).then(data => {
                    console.log(data);
                });
            }
        }
    }
    useEffect(() => {
        debugger
        SignUpUtil.getProductList().then(data => {
            console.log(data);
        });
    }, [])
    return (
        <div className="SignUp-Page">
            <Container fluid className="Container">
                <Row>
                    <Col sm={2}>
                        <Card title="SIGN UP" className="Card">
                            <div className="Deatils-feild">
                                <InputText placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                                <InputText placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                                <Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                                <Password placeholder="Confirm Password" value={cnfpassword} onChange={(e) => setCnfPassword(e.target.value)}/><br/>
                                <Button label="Submit" className="p-button-success" onClick={registration}/><br/>
                                <Link to='/signIn'><p>Have an account?</p></Link>    
                            </div>
                            <div className="Link-Section">
                                <p>Or SignUp With</p>
                                <Link><i className="pi pi-google"></i></Link>
                                <Link><i className="pi pi-apple"></i></Link>
                                <Link><i className="pi pi-facebook"></i></Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default SignUpComposer;