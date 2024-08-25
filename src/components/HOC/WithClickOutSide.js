import React, { Fragment, useEffect, useRef } from 'react';

const WithClickOutSide = ({
  children,
  onClickOutSide = function () {},
  ...props
}) => {
  const wrapperRef = useRef();

  const handleClick = (event) => {
    const { target } = event;
    if (!wrapperRef.current.contains(target)) {
      onClickOutSide();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
};

export default WithClickOutSide;
