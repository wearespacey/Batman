import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import UploadIcon from '@material-ui/icons/CloudUpload';
import { Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MapComponent from './MapPage';
import AddLocationComponent from './addLocation/AddLocationPage';
import UploadComponent from './UploadPage';
import Batman from './batman/Batman';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={4}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

interface LinkTabProps {
  label?: string;
  href?: string;
  icon?: any;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="navigation tabs"
        >
          <LinkTab icon={<HomeIcon/>} label="Home" href="/" { ... a11yProps(0)}/>
          <LinkTab icon={<MapIcon/>} label="Map" href="/map" {...a11yProps(1)}/>
          <LinkTab icon={<AddLocationIcon/>} label="Add location" href="/add" {...a11yProps(2)} />
          <LinkTab icon={<UploadIcon/>} label="Upload file" href="/upload" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Batman/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Map/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddLocationComponent/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UploadComponent/>
      </TabPanel>
    </div>
  );
}

export default NavTabs;