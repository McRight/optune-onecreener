import React from 'react';

import { ColorLightGrey } from '../../../styles/color';

const PreviewText = props => {
  let previewStyle = {
    color: `rgba(${props.chosenColor.r}, ${props.chosenColor.g}, ${props.chosenColor.b}, ${props.chosenColor.a})`,
    background:
      'repeating-linear-gradient(45deg,transparent,transparent 10px,#ccc 10px,#ccc 20px),linear-gradient(to bottom,#eee,#999)',
    padding: '1rem',
    textAlign: 'center',
    minHeight: '28px',
    borderRadius: '0.2rem',
    border: `1px solid ${ColorLightGrey}`,
    boxShadow:
      '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05)'
  };

  return (
    <h2 className='apply-font' style={previewStyle}>
      {props.text}
    </h2>
  );
};

export default PreviewText;
