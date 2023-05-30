import * as React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Tab, Tabs, ImageList, ImageListItem, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import CarItem from "./gallery-car-Item";
import { useState } from "react";
import { toggledCarIndex } from "../../redux/car-slice";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Interior" {...a11yProps(0)} />
            <Tab label="Exterior" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ImageList cols={4}>
            {itemData.map((item,) => (
              <Button
                onClick={() => {
                  dispatch(toggledCarIndex(item.img));
                  setOpen(true);
                }}
              >
                <ImageListItem key={item.img}>
                  <img
                    style={{ borderRadius: 10 }}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
            {itemData1.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  style={{ borderRadius: 10 }}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </TabPanel>
      </Box>
      <CarItem open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const itemData1 = [
  {
    img: "images/10.jpg",
    title: "Breakfast",
  },
  {
    img: "images/11.jpg",
    title: "Burger",
  },
  {
    img: "images/12.jpg",
    title: "Camera",
  },
  {
    img: "images/13.jpg",
    title: "Coffee",
  },
  {
    img: "images/14.jpg",
    title: "Hats",
  },
  {
    img: "images/15.jpg",
    title: "Honey",
  },
  {
    img: "images/16.jpg",
    title: "Basketball",
  },
  {
    img: "images/17.jpg",
    title: "Fern",
  },
  {
    img: "images/18.jpg",
    title: "Mushrooms",
  },
  {
    img: "images/19.jpg",
    title: "Tomato basil",
  },
  {
    img: "images/20.jpg",
    title: "Sea star",
  },
  {
    img: "images/21.jpg",
    title: "Bike",
  },
];

const itemData = [
  {
    img: "images/1.jpg",
    title: "Breakfast",
  },
  {
    img: "images/2.jpg",
    title: "Burger",
  },
  {
    img: "images/3.jpg",
    title: "Camera",
  },
  {
    img: "images/4.jpg",
    title: "Coffee",
  },
  {
    img: "images/5.jpg",
    title: "Hats",
  },
  {
    img: "images/6.jpg",
    title: "Honey",
  },
  {
    img: "images/7.jpg",
    title: "Basketball",
  },
  {
    img: "images/8.jpg",
    title: "Fern",
  },
  {
    img: "images/9.jpg",
    title: "Mushrooms",
  },
  {
    img: "images/10.jpg",
    title: "Tomato basil",
  },
  {
    img: "images/11.jpg",
    title: "Sea star",
  },
  {
    img: "images/12.jpg",
    title: "Bike",
  },
];
