/* eslint-disable no-alert */
import {Fragment, useState, FormEvent, ChangeEvent} from "react";

const starsValues = [
  {
    value: 5,
    title: 'perfect',
  },
  {
    value: 4,
    title: 'good',
  },
  {
    value: 3,
    title: 'not bad',
  },
  {
    value: 2,
    title: 'badly',
  },
  {
    value: 1,
    title: 'terribly',
  },
];

function PropretyFormReview(): JSX.Element {

  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);

  const handlerCommentTextInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(evt.target.value);
  }

  const handlerStarsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;
    setRating(value);
  };

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    alert(`комментарий: ${commentText} рейтинг : ${rating}`);
  };

  const isDisabled: boolean = rating === 0 || commentText.length < 50;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handlerFormSubmit}
      >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          starsValues.map((star) =>
            (
              <Fragment key={star.value}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={star.value}
                  id={`${star.value}-stars`}
                  type="radio"
                  onChange={handlerStarsChange}
                  />
                <label htmlFor={`${star.value}-stars`} className="reviews__rating-label form__rating-label" title={star.title}>
                  <svg className="form__star-image" width="37" height="33" >
                    <use xlinkHref="#icon-star" ></use>
                  </svg>
                </label>
              </Fragment>
            )
          )
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onInput={handlerCommentTextInput}
        >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default PropretyFormReview;
