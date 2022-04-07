import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {useRef, FormEvent, useEffect, useCallback, useState, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {getAuthStatus, getCities} from '../../store/selectors';
import {AuthorizationStatus} from '../../settings/auth-status';
import {getRandomPositiveNumber} from '../../services/randomaizers';
import {changeCity} from '../../store/interface-process/interface-process';


function LoginScreen(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const navigate =  useNavigate();
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const cities = useAppSelector(getCities);
  const randomCity = useMemo(() => cities[getRandomPositiveNumber(0, cities.length-1)], [cities]);
  const emailRegExp = useMemo(() => new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), []);
  const passwordRegExp = useMemo(() => new RegExp(/(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z]{2,}/), []);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [navigate, authStatus]);

  const emailValidation = (email:string) => {
    if (email === '') {
      setEmailError('Email cannot be empty');
      return false;
    }
    if (!emailRegExp.test(`${email}`.toLowerCase())) {
      setEmailError('Incorrect Email');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const passwordValidation = (password: string) => {
    if (password === '') {
      setPasswordError('Password cannot be empty');
      return false;
    }
    if (!passwordRegExp.test(`${password}`.toLowerCase())) {
      setPasswordError('Incorrect password');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const onSubmit = useCallback((authData: AuthData) => {
    dispatch(loginAction(authData));
  },[dispatch]);


  const checkValidation = () =>  {
    if (loginRef.current !== null && passwordRef.current !== null) {
      return emailValidation(loginRef.current.value) && passwordValidation(passwordRef.current.value);
    } else {
      return false;
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (checkValidation() && loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value.trim(),
      });
    }
  };

  const handleCityClick = useCallback(() => dispatch(changeCity(randomCity)), [dispatch, randomCity]);

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              {emailError ? <div style={{color: '#d91818'}}>{emailError}</div> : ''}
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                ref={loginRef}
                id="name"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              {passwordError ? <div style={{color: '#d91818'}}>{passwordError}</div> : ''}
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                ref={passwordRef}
                id="password"
                required
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoute.Main} onClick={handleCityClick}>
              <span>{randomCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
