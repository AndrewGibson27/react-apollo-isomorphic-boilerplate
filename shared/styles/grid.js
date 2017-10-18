import styled from 'styled-components';

import breakpoints from './breakpoints';

const { medium } = breakpoints;
const NUM_COLS = 12;

export const GridRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  @media (max-width: ${medium}) {
    flex-wrap: wrap;
  }
`;

export const GridRowList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  list-style: none;
`;

export const Column = styled.div`
  flex: 1 0 auto;

  @media (max-width: ${medium}) {
    flex: 0 0 100%;
  }
`;

export const ColumnThree = Column.extend`
  width: calc(100% * calc(3/${NUM_COLS}));
`;

export const ColumnNine = Column.extend`
  width: calc(100% * calc(9/${NUM_COLS}));
`;

export const ColumnListItem = styled.li`
  flex: 1 1 auto;
`;
