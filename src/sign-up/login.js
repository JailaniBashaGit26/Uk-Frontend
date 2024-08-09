import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { InputOtp } from 'primereact/inputotp';
import AuthService from './service';
import { Toast } from 'primereact/toast';
import "./style.scss";
import { useNavigate } from "react-router-dom";

let userEmail = '';
function LogInpage() {
    const [showOtp, setShowOtp] = useState(false);
    const [token, setTokens] = useState('');
    const [forGotPassword, setForGotPassword] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    const { control, setValue, formState: { errors }, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            date: null,
            country: null,
            accept: false
        }
    });

    const [formValues, setFormValues] = useState(getValues());

    const customInput = ({ events, props }) => {
        return (
            <>
                <input {...events} {...props} type="text" className="custom-otp-input-sample" />
                {props.id === 2 && (
                    <div className="px-3">
                        <i className="pi pi-minus" />
                    </div>
                )}
            </>
        );
    };

    const showWarn = (msg) => {
        toast.current.show({ severity: 'warn', summary: 'Warning', detail: msg, life: 3000 });
    };

    const onSubmit = (data) => {
        if(!data.name){
            data.name = formValues.name;
        }
        if (data.name && data.password) {
            debugger
            if (forGotPassword) {
                AuthService.updatePassword(data, data.password).then(x => {
                    debugger
                    if (x === 'success') {
                        navigate("/home")
                    } else if (x === 'no_user') {
                        showWarn('User not exist. Please register.');
                    } else {
                        showWarn('Invalid username or password. Please check.');
                    }
                });
            } else {
                AuthService.AllowUserLogin(data).then(x => {
                    if (x === 'success') {
                        navigate("/home")
                    } else if (x === 'no_user') {
                        showWarn('User not exist. Please register.');
                    } else {
                        showWarn('Invalid username or password. Please check.');
                    }
                });
            }
        }
    };

    const forgotPassword = () => {
        const values = getValues();
        if (values.name) {
            userEmail = values.name;
            setShowOtp(true);
            AuthService.ForgotPassword(values).then(x => {
                if (x === 'success') {
                    setShowOtp(true);
                } else {
                    setTokens('');
                }
            });
        }
    };

    const otpVerification = (data) => {
        if (data) {
            AuthService.otpReVerification(getValues(), data).then(x => {
                if (x === true) {
                    setShowOtp(false);
                    setForGotPassword(true);
                   debugger
                   console.log(userEmail);
                   setFormValues({...formValues, name : userEmail})
                   
                } else {
                    setTokens('');
                }
            });
        }
    };

    useEffect(() => {
        setForGotPassword(false);
        userEmail = '';
    }, []);

    return (
        <div className="sign-up-panel">
            <div className="sign-up-container">
                <Toast ref={toast} />
                <div className="left-panel"></div>
                <div className="right-panel">
                    <div className="title-section">
                        <h5>Welcome</h5>
                        <h2>Login to your account</h2>
                    </div>
                    <div className="form-container">
                            <div className={ (showOtp ? 'field-container hide-form' : 'field-container')}>
                                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                    <div className="field">
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Email</label>
                                        <Controller
                                            name="name"
                                            control={control}
                                            disabled={forGotPassword}
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
                                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>{forGotPassword ? 'New Password' : 'Password'}</label>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{ required: 'Password is required.' }}
                                            render={({ field, fieldState }) => (
                                                <Password
                                                    id={field.name} // Changed from field.password to field.name
                                                    {...field}
                                                    autoFocus
                                                    feedback={false}
                                                    toggleMask
                                                    className={classNames({ 'p-invalid': fieldState.invalid })}
                                                />
                                            )}
                                        />
                                        <span className="forgot-password" onClick={forgotPassword}>Forgot password</span>
                                    </div>
                                    <Button type="submit" label="Login" className="mt-2" />
                                </form>
                            </div>
                        {showOtp &&
                            <div className="field-container otp-container">
                                <div className="flex flex-column align-items-center">
                                    <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
                                    <p className="text-color-secondary block mb-5">Please enter the code sent to your mail.</p>
                                    <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} inputTemplate={customInput} style={{ gap: 0 }} />
                                    <div className="flex justify-content-between align-self-stretch otp-buttons">
                                        <Button label="Resend Code" link className="p-0" style={{ display: "none" }}></Button>
                                        <Button label="Confirm" onClick={() => otpVerification(token)}></Button>
                                    </div>
                                </div>
                            </div>}
                        <Divider layout="horizontal" className="flex md:hidden" align="center">
                            <b>OR</b>
                        </Divider>
                        <Button type="button" label="Sign Up" className="mt-2 log-in-btn" onClick={() => navigate('/signinpage')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogInpage;
