/* eslint-disable no-console */
import {useState, MouseEvent} from 'react';
import {SortOptions} from '../../settings/sort-options';

function SortForm(): JSX.Element {
  const [isOpened, setOpenedStatus] = useState(false);
  const handlerSortCLick = () => {
    setOpenedStatus(!isOpened);
 };

  const [activeOption, setActiveOption] = useState(SortOptions.Popular.toString());//корявая toString, но иначе TS с типами ругается
  const placesOptions = Array.from(Object.values(SortOptions));
  const handlerOptionClick = (evt:MouseEvent<HTMLLIElement>) => {
    setActiveOption(evt.currentTarget.id);
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick = {handlerSortCLick}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom places__options${isOpened ? '--opened' : ''}`}>
        {
          placesOptions.map((option) =>
            (
              <li id={option} className={`places__option ${activeOption === option ? 'places__option--active' : ''} `} tabIndex={0} onClick={handlerOptionClick} key={option}>{option}</li>
            ),
          )
        }
      </ul>
    </form>
  );
}

export default SortForm;
