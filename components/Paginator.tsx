import React from 'react';

import styles from 'styles/Paginator.module.css';

function Paginator() {
  return (
    <div className={styles.root}>
      <button>{'<'}</button>
      <button className={styles.active}>1</button>
      <button>2</button>
      <button>3</button>
      <button>{'>'}</button>
    </div>
  );
}

export default Paginator;
