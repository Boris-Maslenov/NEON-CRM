import React, {useState} from "react";

import {IconEdit, Lock} from "../icons/Icons";

const Login = ({login, loginError}) => {

    const [loginValue, setLoginValue] = useState({
        login:'',
        password:'',
    });

    const [error, setError] = useState(false);

    const setValue = (e) => {
        setLoginValue({
                ...loginValue,
                [e.target.name] : e.target.value
        });
    }

    const loginValidate = (loginVal, passwordVal) => {

        if (loginVal !== '' && passwordVal !== '') {
            setError(false);
            login(loginVal, passwordVal);
        } else {
            setError(true);  
        }
    }

    return (
        <div className="login-container">
            <div className="login">
                <h2 className="uk-modal-title uk-text-center">Авторизация</h2>
                <article className="uk-article">
                    <p>Введите имя и пароль администратора:</p>
                </article>
                        <div className="uk-inline uk-width-1-1 uk-margin-top">
                            <span className="uk-form-icon uk-icon">
                                        <IconEdit/>
                            </span>
                            <input onChange={(e) => setValue(e)} name="login" value={loginValue.login}  className="uk-input" type="text" placeholder="Логин"/>
                        </div>
                        <div className="uk-inline uk-width-1-1 uk-margin-top">
                            <span className="uk-form-icon uk-icon">
                                        <Lock/>
                            </span>
                            <input onChange={(e) => setValue(e)} name="password"  value={loginValue.password}  className="uk-input" type="password" placeholder="Пароль"/>
                        </div>

                        <button onClick={()=>loginValidate(loginValue.login, loginValue.password)} type="button" className="uk-button uk-button-secondary uk-width-1-1 uk-margin-small-bottom uk-margin-top">Войти</button>
                
                      <div>{ (error &&  loginError) || error ? 'Поля не должны быть пустыми' : null }</div>
                      <div>{ loginError && !error ? 'Логин или пароль заполнены не верно' : null }</div>
                </div>

                {/* <input placeholder="Пароль" type="password" name="" type="text" className="uk-input uk-margin-top" /> */}

               
            </div>
       
    )
}

export default Login;