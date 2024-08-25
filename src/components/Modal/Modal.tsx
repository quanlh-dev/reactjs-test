import { Button } from '@components/Button/Button';
import { Box, Modal as ModalMaterial, SxProps, Theme } from '@mui/material';
import { ReactNode, RefObject, useImperativeHandle, useState } from 'react';
import './Modal.scss';
import CloseIcon from '@mui/icons-material/Close';
type Props = {
  children: ReactNode;
  modalRef: RefObject<ModalRef>;
  title: string;
  onSave?: () => void;
};

export type ModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
};

export const Modal = (props: Props) => {
  const { children, modalRef, title, onSave } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(
    modalRef,
    () => {
      return {
        openModal: handleOpen,
        closeModal: handleClose,
      };
    },
    [],
  );

  return (
    <ModalMaterial className="modal-common" open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="modal-common-container">
          <div className="modal-common-header">
            <h3>{title}</h3>
            <span onClick={handleClose}>
              <CloseIcon />
            </span>
          </div>
          <div className="modal-common-content">{children}</div>
          <div className="modal-common-footer">
            <Button type="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </Box>
    </ModalMaterial>
  );
};
