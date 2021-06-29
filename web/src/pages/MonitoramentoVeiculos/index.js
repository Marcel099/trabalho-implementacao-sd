
import React, { useState } from 'react';

import {
  AppBar,
  Tabs,
  Tab,
  Box
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { Movimentacao } from '../../components/Movimentacao'
import { UltimaLocalizacaoVeiculos } from '../../components/UltimaLocalizacaoVeiculos'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function MonitoramentoVeiculos() {
  const classes = useStyles();
  const [ activeTab, setActiveTab ] = useState(0)

  function handleTabChange(event, newTab) {
    setActiveTab(newTab)
  }

  return (
    <>
      <h1>Monitoramento de Veículos</h1>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="simple tabs example"
          >
            <Tab label="Localização dos Veículos" {...a11yProps(0)} />
            <Tab label="Movimentação de um Veículo" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={activeTab} index={0}>
          <Movimentacao />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <UltimaLocalizacaoVeiculos />
        </TabPanel>
      </div>
    </>
  )
}