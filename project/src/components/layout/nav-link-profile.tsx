import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {logoutAction} from '../../store/api-actions';
import {AuthorizationStatus} from '../../settings/auth-status';
import {getUserEmail, getAuthStatus} from '../../store/selectors';
import React from 'react';


function NavLinkProfile(): JSX.Element {
  const userEmail = useAppSelector(getUserEmail);
  const authStatus =  useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const handlerSignOutClick = React.useCallback(() =>dispatch(logoutAction()), []);

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
