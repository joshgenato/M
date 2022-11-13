import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useTransportStore from '../../store/transportStore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

const CardOption = () => {
  const [disable, setDisable] = useState(false);
  const state = useTransportStore();
  const { BuyTransportCard, BuyDiscountedTransportCard, TransactionHistory } =
    state;
  const [discountId, SetDiscountId] = useState(null);

  const handleOnClick_TC = () => {
    setDisable(true);
    BuyTransportCard();
    TransactionHistory();
  };

  const handleOnClick_DTC = () => {
    setOpen(true);
    setDisable(true);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (discountId === null) {
      setDisable(false);
    } else {
      BuyDiscountedTransportCard(discountId);
    }
    setOpen(false);
    TransactionHistory();
  };

  const OnChange = (e) => {
    SetDiscountId(e.target.value);
  };

  return (
    <div>
      <Paper elevation={3} sx={{ p: 2 }}>
        <h3>Select Card</h3>
        <Stack spacing={2} direction='row'>
          <Button
            variant='contained'
            onClick={handleOnClick_TC}
            disabled={disable}
          >
            Transport Card
          </Button>
          <Button
            variant='contained'
            onClick={handleOnClick_DTC}
            disabled={disable}
          >
            Discounted Transport Card
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
          <DialogTitle id='alert-dialog-title'>
            {'Discounted Transport Card'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Please enter discount ID senior citizen / pwd Id
            </DialogContentText>
            <TextField
              autoFocus
              autoComplete='false'
              margin='dense'
              id='discountId'
              name='discountId'
              label='Discount ID'
              fullWidth
              variant='standard'
              onChange={OnChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CardOption;
