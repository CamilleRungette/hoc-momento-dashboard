import React from 'react';
import { connect } from 'react-redux';

const Shows = ({shows}) => {

  console.log(shows[0]);
  return (
    <div className='inside-app'>

      {shows.map(show => (
        <div key={show._id} className='card show-main' >
          <h2>{show.title} </h2>
        </div>
      ))}
      
    </div>
  )
}

export default connect (
  (state) => ({
    shows: state.showsReducer
  })
) (Shows)