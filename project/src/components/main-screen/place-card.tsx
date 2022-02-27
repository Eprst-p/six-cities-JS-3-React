import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerType} from '../../types/offer-types';
import {generatePath} from "react-router";

type PlaceCardProps = {
  offer: offerType;
  handlerMouseEnterCard: () => void;
  handlerMouseLeaveCard: () => void;
}

function PlaceCard({offer, handlerMouseEnterCard, handlerMouseLeaveCard} : PlaceCardProps): JSX.Element {
  return (
    <article className="cities__place-card place-card" onMouseEnter={handlerMouseEnterCard} onMouseLeave={handlerMouseLeaveCard} >
      {
        offer.isPremium === true
        ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : null
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link  to={generatePath(AppRoute.Proprety, {id: offer.id.toString()})}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link  to={generatePath(AppRoute.Proprety, {id: offer.id.toString()})}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
