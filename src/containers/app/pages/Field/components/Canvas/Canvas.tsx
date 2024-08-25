import { Area } from '@components/Area/Area';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import './Canvas.scss';
import { FieldItem } from '../FieldItem/FieldItem';
import { Modal, ModalRef } from '@components/Modal/Modal';
import { useRef } from 'react';
import { InputText } from '@components/InputText/InputText';
import { useFormik } from '../../../../../../plugins/formik/useFormik';
import { fieldValidationSchema } from '../../schemas/field.schema';
import { SingleSelect } from '@components/SingleSelect/SingleSelect';
import { FieldType } from '../../field.constants';
import { useTranslation } from 'react-i18next';
import { InputOffset } from '../InputOffset/InputOffset';
import { InputTextArea } from '@components/InputTextArea/InputTextArea';

export const Canvas = () => {
  const modalFieldDeclarationRef = useRef<ModalRef>(null);
  const { t } = useTranslation();

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
        <div className="field-form">
          <InputText required label="Name" name="name" formik={formik} />
          <SingleSelect
            options={Object.values(FieldType).map((f) => ({
              value: f,
              label: t(`fieldType.${f}`),
            }))}
            name="type"
            label="Type"
            required
            formik={formik}
          />
          <InputOffset formik={formik} />
          <InputTextArea
            label="Description"
            name="description"
            formik={formik}
          />
        </div>
      </Modal>
    </Area>
  );
};
