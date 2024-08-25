import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const observerOptions = {
  root: null,
  rootMargin: '200px',
  threshold: 0,
};

const StyledIcon = styled.div`
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-size: ${(props) => (props.cover ? 'cover' : 'contain')};
  background-position: center;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursorPointer && 'pointer'};
`;

const Icon = ({ src, width, height, cursorPointer, cover, ...props }) => {
  const ref = useRef();

  useEffect(() => {
    let observer;

    if (ref.current) {
      const div = ref.current;

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            div.style.backgroundImage = `url("${src}")`;
            observer.disconnect();
          }
        });
      }, observerOptions);
      observer.observe(div);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src]);

  return (
    <StyledIcon
      ref={ref}
      width={width}
      height={height}
      cursorPointer={cursorPointer}
      cover={cover}
      {...props}
    />
  );
};

export default Icon;
