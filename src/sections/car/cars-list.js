import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Tab,
  Tabs,
  ImageList,
  ImageListItem,
  Button,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showCarItemSet, toggledCarTabIndex } from "../../redux/car-slice";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import GalleryItem from "./gallery-item";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CarsList() {
  const { gallery } = useSelector((state) => state.car);

  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <IconButton
        onClick={() => dispatch(toggledCarTabIndex(0))}
        sx={{
          position: "absolute",
          left: (theme) => theme.spacing(2),
          color: "black",
        }}
      >
        <ArrowBackRoundedIcon fontSize="large" />
      </IconButton>
      <Tabs value={value} onChange={handleChange} indicatorColor="secondary">
        <Tab
          sx={{ color: "black !important", fontWeight: 700 }}
          label="Interior"
          {...a11yProps(0)}
        />
        <Tab
          sx={{ color: "black !important", fontWeight: 700 }}
          label="Exterior"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ImageList cols={4}>
          {gallery.map((item) => (
            <Button
              key={item?.toString()}
              onClick={() => {
                dispatch(showCarItemSet(item.img));
              }}
            >
              <ImageListItem key={item.img}>
                <img
                  style={{ borderRadius: 10 }}
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            </Button>
          ))}
        </ImageList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImageList cols={4}>
          {gallery.map((item) => (
            <Button
              key={item?.toString()}
              onClick={() => {
                dispatch(showCarItemSet(item.img));
              }}
            >
              <ImageListItem key={item.img}>
                <img
                  style={{ borderRadius: 10 }}
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            </Button>
          ))}
        </ImageList>
      </TabPanel>
      <GalleryItem />
    </>
  );
}
