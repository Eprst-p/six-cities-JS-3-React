import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {logoutAction} from '../../store/api-actions';
import {AuthorizationStatus} from '../../settings/auth-status'


function NavLinkProfile(): JSX.Element {
  const userEmail = useAppSelector(({USER}) => USER.userEmail);
  const authStatus =  useAppSelector(({USER}) => USER.authorizationStatus);
  const dispatch = useAppDispatch();

  const handlerSignOutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} title={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
            </Link>
        </li>
        <li className="header__nav-item">
          {
            authStatus===AuthorizationStatus.Auth
            ?
            <Link className="header__nav-link" to={AppRoute.Main} title={AppRoute.Main} onClick={handlerSignOutClick}>
              <span className="header__signout">Sign out</span>
            </Link>
            :
            <Link className="header__nav-link" to={AppRoute.Login} title={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          }
        </li>
      </ul>
    </nav>
  );
}

export default NavLinkProfile;
