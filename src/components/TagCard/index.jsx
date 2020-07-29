import React from 'react';
import { Link } from 'gatsby';
import Config from '../../../config';
import Utils from '../../utils/pageUtils';
import style from './tags.module.less';

const Card = props => {
  const { img, name, description, color, disable } = props;

  return (
    <div className={style.tagCard}>
      <div
        className={style.tagImg}
        style={{
          backgroundImage: `url(${img})`,
        }}
      />
      <div className={style.pd20px}>
        <div className="textCenter">
          <h4 style={{ color: `${color}` }}>#{name}</h4>
        </div>
        <p>{description}</p>
      </div>
      {disable && (
        <div className={style.pending}>
          <div className={style.container}>
            <span className={style.pendingText}>敬请期待...</span>
          </div>
        </div>
      )}
    </div>
  );
};
const TagCard = props => {
  const { name, disable } = props;
  const tagPage = Config.pages.tag;
  const link = Utils.resolvePageUrl(tagPage, name);
  return !disable ? (
    <Link className={style.tagCard} to={`/${link}`}>
      <Card {...props} />
    </Link>
  ) : (
    <Card {...props} />
  );
};

export default TagCard;
