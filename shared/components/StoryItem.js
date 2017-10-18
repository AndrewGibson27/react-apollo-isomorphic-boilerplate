import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const StoryItem = ({
  path,
  data: { _id, headline }
}) => (
  <li>
    <p>{headline}</p>
    <NavLink to={`${path}/${_id}`}>Details</NavLink>
  </li>
);

export default StoryItem;
