import React, { Fragment } from 'react';
import spinner from '../../img/spinner/spinner.svg';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '100px', margin: '15rem auto', display: 'block' }}
      alt='loading...'
    />
  </Fragment>
);
