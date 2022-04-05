import { memo, useMemo } from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import NavLinkProfile from './nav-link-profile';

type LayoutSettings = {
  outerDivClass: string,
  headerLogoLinkClass: string,
  isNavElement: boolean,
}

const pagesDifferences:Map<AppRoute | string, LayoutSettings> = new Map();

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
    'Default', {
      outerDivClass: "page",
      headerLogoLinkClass: "header__logo-link",
      isNavElement: true,
    }
  );

function Layout(): JSX.Element {
  const currentLocation = useLocation().pathname;
  const pageSettings = useMemo(() => pagesDifferences.get(currentLocation) || pagesDifferences.get('Default'), [currentLocation]);

  return (
      <div className={pageSettings?.outerDivClass}>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className={pageSettings?.headerLogoLinkClass} to={AppRoute.Main} title={AppRoute.Main}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              {pageSettings?.isNavElement ? <NavLinkProfile /> : null}
            </div>
          </div>
        </header>
        <Outlet />
      </div>
  );
}

export default memo(Layout);
