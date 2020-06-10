import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;

  th {
    padding: 0.5rem;
    vertical-align: top;
  }
  td {
    padding: 0.5rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }

  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }
`;

export const TableContainer = styled.div`
  @media (max-width: 575.98px) {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
`;
