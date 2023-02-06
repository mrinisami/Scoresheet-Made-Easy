import { TableCell, Typography } from '@mui/material';

interface CreateCellProps {
  stat: number | string;
}

export default (props: CreateCellProps) => {
  return (
    <TableCell sx={{ p: 1 }} align="center">
      <Typography>{props.stat}</Typography>
    </TableCell>
  );
};
