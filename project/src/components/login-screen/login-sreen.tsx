import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {useRef, FormEvent, useEffect, useCallback} from 'react';
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
  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [navigate, authStatus]);

  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = useCallback((authData: AuthData) => {
    dispatch(loginAction(authData));
  },[dispatch]);

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  }, [loginRef, passwordRef, onSubmit]);

  const cities = useAppSelector(getCities);
  const randomCity = cities[getRandomPositiveNumber(0, cities.length-1)];
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
