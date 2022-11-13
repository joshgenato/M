import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CardInformation from './CardInformation';
import CardOption from './CardOption';
import Transactions from './Transactions';
//import useTransportStore from '../../store/transportStore';

const Transport = () => {
  //const [selectedCard, setSelectedCard] = useState(0);
  //const transportState = useTransportStore();
  //const { BuyTransportCard, transportCard } = transportState;

  // useEffect(() => {
  //   if (selectedCard != 0) {
  //      ();
  //   }
  // }, [selectedCard]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            {/* <CardOption selectCard={setSelectedCard} /> */}
            <CardOption />
          </Grid>
          <Grid item xs={12}>
            <CardInformation />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Transactions />
        </Grid>
      </Grid>
    </div>
  );
};

export default Transport;
