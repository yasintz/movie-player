import cx from 'classnames';
import { Tv, Film, Video, Icon, User } from 'react-feather';
import styles from './home.module.scss';
import { useHistory } from 'react-router-dom';

import "./MainMenu.css"

export enum Pages {
  Movies = 'movies',
  Series = 'series',
  LiveTV = 'live',
  Info = 'account',
}

export const pagesArray = [
  Pages.Movies,
  Pages.Series,
  Pages.LiveTV,
  Pages.Info,
] as const;

const icons: Record<Pages, Icon> = {
  [Pages.Movies]: Film,
  [Pages.Series]: Video,
  [Pages.LiveTV]: Tv,
  [Pages.Info]: User,
};

const titles: Record<Pages, string> = {
  [Pages.Movies]: 'Movies',
  [Pages.Series]: 'Series',
  [Pages.LiveTV]: 'Live Tv',
  [Pages.Info]: 'Account',
};

const styleByCategory: Record<Pages, string> = {
  [Pages.Movies]: styles.movies,
  [Pages.Series]: styles.series,
  [Pages.LiveTV]: styles.live,
  [Pages.Info]: styles.info,
};

const linkByCategory: Record<Pages, string> = {
  [Pages.Movies]: '/movie/',
  [Pages.Series]: '/series/',
  [Pages.LiveTV]: '/live/category/',
  [Pages.Info]: '/info/',
};

const HomePage = () => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      {pagesArray.map((category) => {
        const IconComp = icons[category];
        const title = titles[category];

        return (
          <div
            key={category}
            className={cx(styles.category, styleByCategory[category])}
            onClick={() => history.push(linkByCategory[category])}
          >
            <IconComp />
            <span>{title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
