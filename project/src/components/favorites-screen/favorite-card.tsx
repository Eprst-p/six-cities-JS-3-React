import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerType} from '../../types/offer-types';
import {generatePath} from "react-router";

type FavoriteCardProps = {
  offer: offerType;
  handlerMouseEnterCard: () => void;
  handlerMouseLeaveCard: () => void;
}

function FavoriteCard({offer, handlerMouseEnterCard, handlerMouseLeaveCard} : FavoriteCardProps): JSX.Element {

  return (
    <article className="favorites__card place-card" onMouseEnter={handlerMouseEnterCard} onMouseLeave={handlerMouseLeaveCard}>
      {
        offer.isPremium
        ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : null
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Proprety, {id: `${offer.id}`})}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '100%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Proprety, {id: `${offer.id}`})}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
