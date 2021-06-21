import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Commute from '@material-ui/icons/Commute';
import AddLocation from '@material-ui/icons/AddLocation';
import Assessment from '@material-ui/icons/Assessment';
import Explore from '@material-ui/icons/Explore';

import { ContextoDrawerNavegacao } from '../../contexts/ContextoDrawerNavegacao';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export function DrawerNavegacaoApp() {
  const {
    isActive,
    anchor,
    toggleDrawer,
  } = useContext(ContextoDrawerNavegacao);

  const classes = useStyles()

  const history = useHistory();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => history.push('/veiculo')}>
            <ListItemIcon>
              <Commute />
            </ListItemIcon>
            <ListItemText primary={'Manutenção de Veículos'} />
        </ListItem>

        <ListItem button onClick={() => history.push('/localizacao/new')}>
          <ListItemIcon>
            <AddLocation />
          </ListItemIcon>
          <ListItemText primary={'Informar Localização'} />
        </ListItem>

        <ListItem button onClick={() => history.push('/monitoramento-veiculos')}>
          <ListItemIcon>
            <Assessment />
          </ListItemIcon>
          <ListItemText primary={'Monitoramento de Veículos'} />
        </ListItem>

        <ListItem button onClick={() => history.push('/veiculo/simulador-deslocamento')}>
          <ListItemIcon>
            <Explore />
          </ListItemIcon>
          <ListItemText primary={'Simulador de Deslocamento'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <aside>
      <Drawer anchor={anchor} open={isActive} onClose={toggleDrawer(false)}>
        {list(anchor)}
      </Drawer>
    </aside>
  )
}

/*
Organização alternativa pra pedir ao Rebonatto:


-- Manutenção de veículos
---- Informar localização atual de um veículo selecionado
---- Simulador de Deslocamento de um veículo selecionado
-- Simulador de Deslocamento
*/
