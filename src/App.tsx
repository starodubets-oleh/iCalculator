import React from 'react';
import Calculator from './Calculator';

import styles from './styles.module.scss';

import './assets/scss/global.scss';

const App = () => (
  <div className={styles.container}>
    <Calculator />
  </div>
);

export default App;
