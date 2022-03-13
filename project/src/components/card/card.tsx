import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {CardVariant} from '../../settings/card-variants';
import {offerType} from '../../types/offer-types';
import {generatePath} from "react-router";

type CardProps = {
  cardVariant: string;
  offer: offerType;
  handlerMouseEnterCard?: () => void;
  handlerMouseLeaveCard?: () => void;
}

const cardDifferences = new Map();

cardDifferences
  .set(
    CardVariant.PlaceCard, {
      articleClass: "cities__place-card",
      divImgWrapperClass: "cities",
      divInfoClass: "place-card__info",
      imgWidth: "260",
      imgHeigh: "200",
    }
  )
  .set(
    CardVariant.FavoriteCard, {
      articleClass: "favorites__card",
      divImgWrapperClass: "favorites",
      divInfoClass: "favorites__card-info place-card__info",
      imgWidth: "150",
      imgHeigh: "110",
    }
  )
  .set(
    CardVariant.NearPlaceCard, {
      articleClass: "near-places__card",
      divImgWrapperClass: "near-places",
      divInfoClass: "place-card__info",
      imgWidth: "260",
      imgHeigh: "200",
    }
  );

function Card({cardVariant, offer, handlerMouseEnterCard, handlerMouseLeaveCard} : CardProps): JSX.Element {
  const cardSettings = cardDifferences.get(cardVariant);

  return (
    <article className={`${cardSettings.articleClass} place-card`} onMouseEnter={handlerMouseEnterCard} onMouseLeave={handlerMouseLeaveCard} >
      {
        offer.isPremium === true
        ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : null
      }
      <div className={`${cardSettings.divImgWrapperClass}__image-wrapper place-card__image-wrapper`}>
        <Link  to={generatePath(AppRoute.Proprety, {id: `${offer.id}`})}>
          <img className="place-card__image" src={offer.previewImage} width={cardSettings.imgWidth} height={cardSettings.imgHeigh} alt="Place" />
        </Link>
      </div>
      <div className={cardSettings.divInfoClass}>
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
          <Link  to={generatePath(AppRoute.Proprety, {id: `${offer.id}`})}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
