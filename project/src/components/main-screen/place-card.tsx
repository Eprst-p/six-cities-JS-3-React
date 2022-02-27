import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerType} from '../../types/offer-types';
import {useState,} from 'react';

type PlaceCardProps = {
  offer: offerType;
}

function PlaceCard({offer} : PlaceCardProps): JSX.Element {
  const [id, setId] = useState(0);
  const handlerMouseOverCard = () => { //пока не очень понятен сакральный смылс, но по заданию надо было сделать. А так то айди можно просто передать через offer.id
    setId(offer.id);
  };
  return (
    <article className="cities__place-card place-card" onMouseOver={handlerMouseOverCard} >
      {
        offer.isPremium === true
        ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : null
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link  to={`${AppRoute.Proprety}/${id}`}>
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
          <Link  to={`${AppRoute.Proprety}/${id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
