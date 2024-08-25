import React from 'react';
import { Button } from 'antd';
import './styles.scss';
import { hideModal } from 'redux/actions/modal';
import { modalName } from 'constants/modal';
import { useDispatch } from 'react-redux';
import { CloseModalIcon } from '../CloseModalIcon';

export function HeaderModal() {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(hideModal(modalName.MULTI_LANGUAGE));
  };

  return (
    <div className="header-modal-wrapper">
      <span className="modal-title">Tùy chỉnh ngôn ngữ</span>
      <div className="header-modal__side--right">
        <Button disabled className="header-modal__button">
          Áp dụng
        </Button>
        {/* <CloseModalIcon /> */}
        <CloseModalIcon onClick={handleCloseModal} />
      </div>
    </div>
  );
}
