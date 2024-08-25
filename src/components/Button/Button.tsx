import {
  Button as ButtonMaterial,
  ButtonProps as ButtonPropsMaterial,
} from '@mui/material';
import './Button.scss';
import { useMemo } from 'react';

type ButtonProps = {
  type: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
  const { type, children, onClick } = props;

  const bgColor = useMemo(() => {
    switch (type) {
      case 'primary':
        return '#A06227';
      case 'secondary':
        return '#49535E';
      default:
        return '#008CBA';
    }
  }, [type]);

  return (
    <ButtonMaterial
      style={{
        backgroundColor: bgColor,
        color: '#fff',
      }}
      onClick={onClick}
      className="btn-common"
    >
      <div>{children}</div>
    </ButtonMaterial>
  );
};
