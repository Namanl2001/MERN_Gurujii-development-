import React from 'react';
import Board from './../board.jpg';

function about() {
  return (
    <div className='parallax'>
      <div className='center'>
        <img src={Board} alt='' />
      </div>
    </div>
  );
}

export default about;
