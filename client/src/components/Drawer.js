import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Add, FormatListBulleted, Home, Menu } from '@mui/icons-material';

export default function TemporaryDrawer() {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(open);
  };

  const listItem = (navigateTo, text) => (
    <Link to={navigateTo}>
      <ListItem key={text} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            {text === 'Home' ? (
              <Home />
            ) : text === 'List Students' ? (
              <FormatListBulleted />
            ) : (
              <Add />
            )}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </Link>
  );

  return (
    <nav>
      <IconButton
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {listItem('/', 'Home')}
            {listItem('/students', 'List Students')}
            {listItem('/students/new', 'Create Student')}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}
