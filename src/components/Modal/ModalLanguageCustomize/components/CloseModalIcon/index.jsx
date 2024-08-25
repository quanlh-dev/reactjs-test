import React from 'react';
import './styles.scss';

export function CloseModalIcon({ ...props }) {
  return (
    <button className="close-modal-icon" {...props}>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.228516 7.77169L3.48298 4.19812L0.613082 0.914551H1.93897L3.46576 2.67327C3.78336 3.03811 4.00913 3.31876 4.14306 3.51521C4.33056 3.26575 4.5525 3.00537 4.80887 2.73408L6.50211 0.914551H7.71321L4.75721 4.14667L7.9428 7.77169H6.56525L4.44727 5.32539C4.32864 5.18506 4.20619 5.03227 4.07992 4.867C3.89242 5.11646 3.75849 5.28797 3.67813 5.38152L1.56589 7.77169H0.228516Z"
          fill="#272727"
        />
      </svg>
    </button>
  );
}
