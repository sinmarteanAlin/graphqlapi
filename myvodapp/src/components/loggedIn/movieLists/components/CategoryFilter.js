import React from 'react';

const CategoryFilter = (props) => {
    return (
        <div className="order-movie-container">
           <select className="form-control" value={props.selectValue} onChange={props.handleSelectChange}>
               <option value="popular">Popular</option>
               <option value="now_playing">Now Playing</option>
               <option value="top_rated">Top Rated</option>
               <option value="upcoming">Upcoming</option>
           </select>
       </div>
    )
}

export default CategoryFilter;
