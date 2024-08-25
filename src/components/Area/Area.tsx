import './Area.scss';

type Props = {
  header: string;
  children: ReactNode;
};

export const Area = (props: Props) => {
  const { header, children } = props;
  return (
    <div className="__area">
      <div className="__area-header-container">
        <div className="__area-header">{header}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};
