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
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  apartmentPhotos.map((url) =>
                    (
                      <div className="property__image-wrapper" key={url}>
                        <img className="property__image" src={url} alt="studio" key={url} />
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
                      new Array(REVIEW_AMOUNT).fill('').map((_, index) =>
                        (
                          // eslint-disable-next-line react/no-array-index-key
                          <li className="reviews__item" key={`review-${index}`}>
                            <PropretyReview key={`review-${index}`}/>
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
      </div>
    </>
  );
}

export default PropretyScreen;
