/* eslint-disable react/no-array-index-key */
import PropretyHost from './proprety-host';
import PropretyReview from './proprety-review';
import PropretyFormReview from './proprety-form-review';
import PropretyNearPlaceCard from './proprety-near-place-card';
import {offerType} from '../../types/offer-type';
import {commentType} from '../../types/comment-type';
import {useParams} from 'react-router-dom';

type PropretyScreenProps = {
  allOffers: offerType[];
  allComments: commentType[][];
}

function PropretyScreen({allOffers, allComments}: PropretyScreenProps): JSX.Element {

  const currentId = useParams().id;

  const getCurrentOffer = (): offerType | null => {
    let offerForId = null;
    allOffers.forEach((offer) => {
      if (offer.id.toString() === currentId) {
        offerForId = offer;
      }
    })
    return offerForId;
  }
  const currentOffer = getCurrentOffer();

  const apartmentFeatures = [
    currentOffer?.type,
    `${currentOffer?.bedrooms} Bedrooms`,
    `Max ${currentOffer?.maxAdults} adults`,
  ];

  const nearPlaces = allOffers.slice(0, 2);

  const getCurrentComments = (): commentType[] | null => {
    let commentsForOffer = null;
    allOffers.forEach((offer, index) => {
      if (offer.id.toString() === currentId) {
        commentsForOffer = allComments[index];
      }
    })
    return commentsForOffer;
  }
  const currentComments = getCurrentComments();

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              currentOffer?.images.map((photo) =>
                (
                  <div className="property__image-wrapper" key={photo}>
                    <img className="property__image" src={photo} alt="studio" key={photo} />
                  </div>),
              )
            }
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {
              currentOffer?.isPremium === true
              ?
              <div className="property__mark">
                <span>Premium</span>
              </div>
              : null
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {currentOffer?.title}
              </h1>
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: '80%'}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{currentOffer?.rating}</span>
            </div>
            <ul className="property__features">
              {
                apartmentFeatures.map((feature) =>
                  (
                    <li className="property__feature property__feature--entire" key={feature}>
                      {feature}
                    </li>)
                )
              }
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{currentOffer?.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {
                  currentOffer?.goods.map((item) =>
                    (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>)
                  )
                }
              </ul>
            </div>
            <div className="property__host">
              <PropretyHost offer={currentOffer} />
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentComments?.length}</span></h2>
              <ul className="reviews__list">
                {
                  currentComments?.map((comment) =>
                    (
                    <li className="reviews__item" key={`review-${comment.id}`}>
                      <PropretyReview key={`review-${comment.id}`} comment={comment}/>
                    </li>)
                  )
                }
              </ul>
              <PropretyFormReview />
            </section>
          </div>
        </div>
        <section className="property__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {
              nearPlaces.map((location) => (
                <li className="reviews__item" key={`near-card-${location.id}`}>
                  <PropretyNearPlaceCard key={`near-card-${location.id}`} offer={location}/>
                </li>)
                )
            }
          </div>
        </section>
      </div>
    </main>
  );
}

export default PropretyScreen;
