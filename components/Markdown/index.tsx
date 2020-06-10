import ReactMarkdown from 'react-markdown';
import { Table, TableContainer } from '../Table';

const TableRender: React.FunctionComponent = ({ children }) => {
  return (
    <TableContainer>
      <Table>{children}</Table>
    </TableContainer>
  );
};

export const Markdown = ({ source }: { source: string }) => {
  return <ReactMarkdown source={source} renderers={{ table: TableRender }} />;
};
