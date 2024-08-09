import React, { useRef } from "react";
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { InputOtp } from 'primereact/inputotp';
import AuthService from './service';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

import "./style.scss"
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [showOtp, setShowOtp] = useState(false);
    const [token, setTokens] = useState();
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const navigate = useNavigate();

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        date: null,
        country: null,
        accept: false
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const customInput = ({ events, props }) => {
        return <><input {...events} {...props} type="text" className="custom-otp-input-sample" />
            {props.id === 2 && <div className="px-3">
                <i className="pi pi-minus" />
            </div>}
        </>
    };

    const showWarn = (msg) => {
        toast.current.show({ severity: 'warn', summary: 'Warning', detail: msg, life: 3000 });
    };
    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]/.test(password);
        const hasMinLength = password.length >= 8;
      
        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && hasMinLength;
      };
    const onSubmit = (data) => {
        setShowErrorMsg(false);
        if (data.name && data.password) {
            // setShowOtp(true);
            let userData = {
                firstname : '',
                username : data.name,
                password : data.password
            }
            if(validatePassword(data.password)){
                setLoading(true);
                AuthService.SendEmail(userData).then(x=> {
                    setLoading(false);
                    if(x === 'success')
                        setShowOtp(true);
                    else
                        {
                            setShowOtp(false);
                            showWarn('User already exist. please log in.');
                        }
                });
            } else {
                showWarn('Password must be at least 8 characters and include an uppercase, a lowercase, a number, and a special character.');
            }
        }
        // reset();
    };

    const otpVerification = (data) => {
        debugger
        if (data && data.length === 6) {
            setLoading(true)
            AuthService.otpVerification(control._formValues, data).then(x=> {
                setLoading(false)
                if(x === true){
                    navigate("/home")
                }
                else{
                    setTokens(null);
                }
            });
        }
        // reset();
    };

    return (
        <div className="sign-up-panel">
            <div className="sign-up-container">
            <Toast ref={toast} />
                <div className="left-panel"></div>
                <div className="right-panel">
                    <div className="title-section">
                        <h5>Welcome</h5>
                        <h2>Register to your account</h2>
                    </div>
                    <div className="form-container">
                        {!showOtp &&
                            <div className="field-container">
                                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                    <div className="field">
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Enter your email</label>
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{ required: 'Name is required.' }}
                                            render={({ field, fieldState }) => (
                                                <InputText
                                                    id={field.name}
                                                    {...field}
                                                    autoFocus
                                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="field password-panel">
                                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Enter your password</label>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{ required: 'Password is required.' }}
                                            render={({ field, fieldState }) => (
                                                <Password
                                                    id={field.password}
                                                    {...field}
                                                    autoFocus
                                                    feedback={false}
                                                    toggleMask
                                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                                />
                                            )}
                                        />
                                         {showErrorMsg && <span className="forgot-password alreadyexist">User already exist</span>}
                                    </div>
                                    <Button  disabled={loading} type="submit" label={loading ? null : "Sign Up" } className="mt-2" >{loading && <ProgressSpinner style={{ width: '2rem', height: '2rem' }} />}</Button>
                                </form>
                            </div>}
                        {showOtp &&
                            <div className="field-container otp-container">
                                <div className="flex flex-column align-items-center">
                                    <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
                                    <p className="text-color-secondary block mb-5">Please enter the code sent to your mail.</p>
                                    <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} inputTemplate={customInput} style={{ gap: 0 }} />
                                    <div className="flex justify-content-between align-self-stretch otp-buttons">
                                        <Button label="Resend Code" link className="p-0" style={{"display": "none"}}></Button>
                                        <Button label={loading ? null : "Confirm"} disabled={loading || !token || token.length !== 6} onClick={() => otpVerification(token)}>{loading && <ProgressSpinner style={{ width: '2rem', height: '2rem' }} />}</Button>
                                    </div>
                                </div>
                            </div>}
                        <Divider layout="horizontal" className="flex md:hidden" align="center">
                            <b>OR</b>
                        </Divider>
                        <Button type="button" label="Login" className="mt-2 log-in-btn navigation-btn" onClick={() => navigate('/')}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;