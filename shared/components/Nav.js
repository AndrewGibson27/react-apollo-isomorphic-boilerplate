import React, { Component } from 'react';

import { GridRowList, ColumnListItem } from '../styles/grid';
import { NavAnchor } from '../styles/nav';

const Nav = () => {
  return (
    <nav>
      <GridRowList>
        <ColumnListItem>
          <NavAnchor to="/featured">Featured</NavAnchor>
        </ColumnListItem>

        <ColumnListItem>
          <NavAnchor to="/latest">Latest</NavAnchor>
        </ColumnListItem>
      </GridRowList>
    </nav>
  );
};

export default Nav;
