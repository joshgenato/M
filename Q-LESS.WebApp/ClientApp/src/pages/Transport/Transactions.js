import { Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useTransportStore from '../../store/transportStore';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Transactions = () => {
  const state = useTransportStore();
  const { transactions, TransactionHistory } = state;

  useEffect(() => {
    TransactionHistory();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <h3>Transactions</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((transaction, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell align='right'>{transaction.amount}</TableCell>
                <TableCell align='right'>
                  {moment(transaction.date).format('MM/DD/YYYY hh:mm:ss')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Transactions;
