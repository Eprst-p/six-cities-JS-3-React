/* eslint-disable react/no-array-index-key */
import PropretyHost from './proprety-host';
import PropretyReview from './proprety-review';
import PropretyFormReview from './proprety-form-review';
import PropretyNearPlaceCard from './proprety-near-place-card';

//пока данные просто здесь для теста, без пропсов
const apartmentPhotos = ['img/room.jpg', 'img/apartment-01.jpg','img/apartment-02.jpg','img/apartment-03.jpg','img/apartment-small-03.jpg','img/apartment-small-04.jpg'];
const apartmentFeatures = ['Apartment', '3 Bedrooms', 'Max 4 adults'];
const insideItems = ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'];

const REVIEW_AMOUNT = 3;
const NEAR_CARDS_AMOUNT = 3;

function PropretyScreen(): JSX.Element {
  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              apartmentPhotos.map((photo) =>
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
            <div className="property__mark">
              <span>Premium</span>
            </div>
            <div className="property__name-wrapper">
              <h1 className="property__name">
                Beautiful &amp; luxurious studio at great location
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
              <span className="property__rating-value rating__value">4.8</span>
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
              <b className="property__price-value">&euro;120</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {
                  insideItems.map((item) =>
                    (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>)
                  )
                }
              </ul>
            </div>
            <div className="property__host">
              <PropretyHost />
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{REVIEW_AMOUNT}</span></h2>
              <ul className="reviews__list">
                {
                  REVIEW_AMOUNT > 0
                  ?
                  new Array(REVIEW_AMOUNT).fill('').map((_, index) =>
                    (
                      <li className="reviews__item" key={`review-${index}`}>
                        <PropretyReview key={`review-${index}`}/>
                      </li>)
                  )
                  : null
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
              new Array(NEAR_CARDS_AMOUNT).fill('').map((_, index) =>
                (
                  // eslint-disable-next-line react/no-array-index-key
                  <li className="reviews__item" key={`near-card-${index}`}>
                    <PropretyNearPlaceCard key={`near-card-${index}`}/>
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
