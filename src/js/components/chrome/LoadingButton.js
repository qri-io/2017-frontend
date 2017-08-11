import React, { PropTypes } from 'react';

const LoadingButton = ({ loading, children }) => {
  return (
    <button disabled={!loading} className="btn btn-primary">{children}</button>
  );
};

LoadingButton.propTypes = {
  loading: PropTypes.bool,
};

LoadingButton.defaultProps = {
  loading: false,
};

export default LoadingButton;
