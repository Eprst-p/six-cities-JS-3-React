import {Fragment, useState, FormEvent, ChangeEvent, useRef, memo, createRef} from "react";
import {NewCommentType, CommentData} from "../../types/comment-type";
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {pushCommentAction, fetchCommentsAction} from '../../store/api-actions';
import {CommentLength} from '../../settings/comments-settings';
import {formSubmit} from '../../store/interface-process/interface-process';
import {getIsFormDisabled} from "../../store/selectors";
import throttle from 'lodash.throttle'


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

type PropertyFormReviewProps = {
  id: number;
}

function PropertyFormReview({id} : PropertyFormReviewProps): JSX.Element {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const starInputRefs = starsValues.map(() => createRef<HTMLInputElement>());
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const isButtonDisabled: boolean = rating === 0 || commentText.length < CommentLength.Min || commentText.length > CommentLength.Max;
  const dispatch = useAppDispatch();
  const isFormDisabled = useAppSelector(getIsFormDisabled);

  const handleStarsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;
    setRating(value);
  };

  const handleTextAreaInput = throttle(() => {
    const commentTextRef = textAreaRef.current !== null ? textAreaRef.current.value : '';
    setCommentText(commentTextRef);
  }, 1000)

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newComment:NewCommentType = {
      comment: commentText,
      rating: rating,
    };
    const commentData:CommentData = {
      newComment,
      id
    };
    dispatch(pushCommentAction(commentData))
    .then(() => dispatch(fetchCommentsAction(id)))
    dispatch(formSubmit(true))
    if (textAreaRef.current !== null) {
      textAreaRef.current.value = '';
    }
    setRating(0);
    setCommentText('');
    starInputRefs.forEach((starRef) => starRef.current !== null ? starRef.current.checked = false : null);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
      >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          starsValues.map((star, i) =>
            (
              <Fragment key={star.value}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={star.value}
                  id={`${star.value}-stars`}
                  type="radio"
                  onChange={handleStarsChange}
                  disabled={isFormDisabled}
                  ref={starInputRefs[i]}
                />
                <label htmlFor={`${star.value}-stars`} className="reviews__rating-label form__rating-label" title={star.title}>
                  <svg className="form__star-image" width="37" height="33" >
                    <use xlinkHref="#icon-star" />
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
        onInput={handleTextAreaInput}
        ref={textAreaRef}
        disabled={isFormDisabled}
        >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default memo(PropertyFormReview);
