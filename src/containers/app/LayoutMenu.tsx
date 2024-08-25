import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import '@assets/scss/LayoutMenu.scss';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';


type Props = {};

const LayoutMenu: FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const dispatch = useDispatch();

  return (
    <div>
      <Outlet />
    </div>
  );
  //   return (
  //     <div>
  //       Home
  //       <FontAwesomeIcon className="icon-menu" icon={faTasks} />
  //     </div>
  //   );
};

export default LayoutMenu;
