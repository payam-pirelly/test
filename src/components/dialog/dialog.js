import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, ImageList, ImageListItem, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { showCarIndexSet, toggledCarTabIndex } from "../../redux/car-slice";
import ShowWindowDimensions from "../../utils/resize";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function FullScreenDialog() {
  const { carTabIndex } = useSelector((state) => state.car);
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const { width, height } = ShowWindowDimensions();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={carTabIndex === 2}
        TransitionComponent={Transition}
      >
        <AppBar
          position="fixed"
          sx={{ background: "white", boxShadow: "none" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              onClick={() => dispatch(toggledCarTabIndex(3))}
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "black" }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Box display={"flex"} justifyContent={"center"} width={"100%"}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
              >
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
            </Box>
          </Toolbar>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ImageList cols={1}>
            {itemData.map((item) => (
              <Button onClick={() => dispatch(showCarIndexSet(item.img))}>
                <ImageListItem key={item.img}>
                  <img
                    width={width}
                    style={{
                      borderRadius: 10,
                      height: width > height ? height - 48 : "100%",
                      width: "100%",
                    }}
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
          <ImageList cols={1}>
            {itemData1.map((item) => (
              <Button
                onClick={() => {
                  dispatch(showCarIndexSet(item.img));
                }}
              >
                <ImageListItem key={item.img}>
                  <img
                    width={width}
                    style={{
                      borderRadius: 10,
                      width: "100%",
                      height: width > height ? height - 48 : "100%",
                    }}
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
      </Dialog>
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
