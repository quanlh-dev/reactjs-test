import { Area } from '@components/Area/Area';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import './Canvas.scss';
import { FieldItem } from '../FieldItem/FieldItem';
import { Modal, ModalRef } from '@components/Modal/Modal';
import { useRef } from 'react';
import { InputText } from '@components/InputText/InputText';
import { useFormik } from '../../../../../../plugins/formik/useFormik';
import { fieldValidationSchema } from '../../schemas/field.schema';

export const Canvas = () => {
  const modalFieldDeclarationRef = useRef<ModalRef>(null);

  const onOpenModalFieldDeclaration = () => {
    modalFieldDeclarationRef.current?.openModal();
  };

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Area header="Canvas">
      <div className="canvas-container">
        <div className="canvas-content">
          <FieldItem />
        </div>
        <div className="canvas-des">
          <div
            className="canvas-des-add-btn"
            onClick={onOpenModalFieldDeclaration}
          >
            <ControlPointIcon />
          </div>
        </div>
      </div>
      <Modal title="Field Declaration" modalRef={modalFieldDeclarationRef}>
        <div>
          <InputText name="name" formik={formik} />
        </div>
      </Modal>
    </Area>
  );
};
