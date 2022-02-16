import {Outlet, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const';
import NavLinkProfile from './nav-link-profile';

const pagesDifferences = new Map();

pagesDifferences
  .set(
    AppRoute.Main, {
      outerDivClass: "page page--gray page--main",
      headerLogoLinkClass: "header__logo-link header__logo-link--active",
      isNavElement: true,
    }
  )
  .set(
    AppRoute.Favorites, {
      outerDivClass: "page",
      headerLogoLinkClass: "header__logo-link",
      isNavElement: true,
    }
  )
  .set(
    AppRoute.Login, {
      outerDivClass: "page page--gray page--login",
      headerLogoLinkClass: "header__logo-link",
      isNavElement: false,
    }
  )
  .set(
    AppRoute.Proprety, {
      outerDivClass: "page",
      headerLogoLinkClass: "header__logo-link",
      isNavElement: true,
    }
  );

function Layout(): JSX.Element {
  const currentLocation = useLocation().pathname;
  const pageSettings = pagesDifferences.get(currentLocation);

  return (
      <div className={pageSettings.outerDivClass}>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className={pageSettings.headerLogoLinkClass}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              {pageSettings.isNavElement ? <NavLinkProfile /> : ''}
            </div>
          </div>
        </header>
        <Outlet />
      </div>
  );
}

export default Layout;
