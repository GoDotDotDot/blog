import React from 'react';
import FA from 'react-fontawesome';

import style from './about.module.less';

const GitProject = props => {
  const { name, intro, stars, forks, url } = props;
  return (
    <a className={style.aboutTile} href={url}>
      <h3>{name}</h3>
      <h4 className={style.intro}>{intro}</h4>
      <div className={style.row}>
        <div>
          <FA name="star" />
          <span>{stars}</span>
        </div>
        <div>
          <FA name="code-fork" />
          <span>{forks}</span>
        </div>
      </div>
    </a>
  );
};

export default GitProject;
