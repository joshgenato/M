import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import moment from 'moment';
import { Stack } from '@mui/system';
import useTransportStore from '../../store/transportStore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

const CardInformation = () => {
  const state = useTransportStore();
  const {
    transportCard,
    OnBoard,
    OffBoard,
    Reload,
    change,
    ClearChange,
    CardInformation,
    TransactionHistory,
  } = state;

  const handleOnBoard = () => {
    transportCard.isOnBoard ? OffBoard() : OnBoard();
    TransactionHistory();
  };

  const [open, setOpen] = React.useState(false);
  const handleReload = () => {
    setOpen(true);
  };
  const [amount, SetAmount] = useState(0);
  const [customerMoney, setCustomerMoney] = useState(0);

  const handleClose = () => {
    ClearChange();
    setOpen(false);
  };

  const handleSubmit = async () => {
    await Reload(amount, customerMoney);
    CardInformation();
    TransactionHistory();
  };

  const OnChange = (e) => {
    SetAmount(e.target.value);
  };

  const OnChangeCustomerMoney = (e) => {
    setCustomerMoney(e.target.value);
  };

  useEffect(() => {
    console.log('transportCard', transportCard);
  }, [transportCard]);

  return (
    <>
      {transportCard && (
        <div>
          <Paper elevation={3} sx={{ p: 2 }}>
            <h3>Card Information</h3>
            <Typography> Load: {transportCard.balance}</Typography>
            <Typography>
              Expiration:{' '}
              {moment(transportCard.expiryDate).format('MM/DD/YYYY')}
            </Typography>
            <Typography>
              On-Board: {transportCard.isOnBoard.toString()}
            </Typography>
            <Stack spacing={2} direction='row' sx={{ pt: 2 }}>
              <Button
                variant='contained'
                color={transportCard.isOnBoard ? 'error' : 'success'}
                onClick={handleOnBoard}
              >
                {transportCard.isOnBoard ? 'Off-Board' : 'On-Board'}
              </Button>
              <Button variant='contained' onClick={handleReload}>
                Reload
              </Button>
            </Stack>
          </Paper>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{'Reload'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Please enter amount
                </DialogContentText>
                <TextField
                  autoFocus
                  autoComplete='false'
                  margin='dense'
                  name='reload'
                  label='Amount to Load'
                  fullWidth
                  variant='standard'
                  onChange={OnChange}
                />
                <TextField
                  autoComplete='false'
                  margin='dense'
                  name='reload'
                  label='Customer Money'
                  fullWidth
                  variant='standard'
                  onChange={OnChangeCustomerMoney}
                />
                {change && (
                  <>
                    <TextField
                      autoComplete='false'
                      margin='dense'
                      name='reload'
                      label='Change'
                      fullWidth
                      variant='standard'
                      defaultValue={change}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    New Balance:{' '}
                    <Typography>{transportCard.balance}</Typography>
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default CardInformation;
