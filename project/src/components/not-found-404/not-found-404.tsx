import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const styleFlexContainer = {
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-around',
  alignItems: 'center',
};

const styleImg = {
  width: 1100,
  height: 400,
};

const styleText = {
  fontSize: '300%',
};

const styleReasons = {
  fontSize: '150%',
};

const styleBackLink = {
  fontSize: '200%',
  color: 'blue',
  marginLeft: 400,
};

function NotFound404(): JSX.Element {
  return (
  <div style = {styleFlexContainer}>
    <div style = {styleText}>
      <h1>
        404
        <br />
        <small>Page not found</small>
      </h1>
    </div>
    <Link to={AppRoute.Main} style = {styleBackLink}>Go to main page</Link>
    <img  src="img/404notFound.png" alt="stop the bus" style = {styleImg} />
    <div style={styleReasons}>
      <p><b>Why could this happen?</b></p>
      <ul>
        <li>
          the physical laws of our universe have been changed.
        </li>
        <li>
          reptilians and masons interfered with the work of the site.
        </li>
        <li>
          you are hallucinating, but the page actually exists in reality.
        </li>
        <li>
          kittens need to be stroked before you can continue.
        </li>
        <li>
          your computer has been taken over by a global AI, prepare for annihilation just in case.
        </li>
      </ul>
    </div>
  </div>
  );
}

export default NotFound404;
