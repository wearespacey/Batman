import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MapIcon from '@material-ui/icons/Map';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import UploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Menu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Map" icon={<MapIcon/>} />
        <Tab label="Add location" icon={<AddLocationIcon/>} />
        <Tab label="Upload audio" icon={<UploadIcon/>} />
      </Tabs>
    </Paper>
  );
}

export default Menu;