import React, { useState } from "react";
import { Pannellum } from "pannellum-react";

import { useDispatch, useSelector } from "react-redux";
import HotspotDetail from "./hotspot-detail";
import {
  carHotSpotCardOpenToggled,
  carHotSpotCardStatusSet,
  carHotSpotEnableSet,
  toggledSecondHotSpotPosition,
} from "../../redux/car-slice";
import { useEffect } from "react";

function Interior360() {
  const { interiorCarStatus, carHotSpotEnable } = useSelector(
    (state) => state.car
  );
  const [yaw, setYaw] = useState(0); // move in x -180,180
  const [pitch, setPitch] = useState(0); // move in y -180,180
  const src = `/images/${interiorCarStatus}.jpg`;
  const dispatch = useDispatch();

  const hotspot = (hotSpotDiv, args) => {
    const imageDiv = document.createElement("img");
    // imageDiv.setAttribute("width", "40");
    // imageDiv.setAttribute("height", "40");
    imageDiv.setAttribute("id", "test1");

    imageDiv.classList.add("pirelly-custom-tooltip");
    imageDiv.setAttribute("src", "hotspot-point.svg"); // https://img.icons8.com/ios/1600/circled-up-filled.png
    hotSpotDiv.appendChild(imageDiv);
  };

  const handleClick = (evt, name) => {
    setYaw(-120);
    setPitch(-10);

    dispatch(carHotSpotEnableSet(false));
    dispatch(carHotSpotCardOpenToggled());
    dispatch(carHotSpotCardStatusSet(1));

    const element = document.getElementById("test1");
    const { top, left } = element;
    dispatch(toggledSecondHotSpotPosition({ x: left, y: top }));

    // handleHotspot();
  };

  const handleClose = () => {
    // setPitch(0);
    // setYaw(0);
    // handleHotspot();
  };

  useEffect(() => {
    const handleHotspot = () => {
      if (carHotSpotEnable)
        document
          .querySelectorAll(".pirelly-custom-tooltip")
          .forEach(function (e) {
            e.style.visibility = "visible";
          });
      else
        document
          .querySelectorAll(".pirelly-custom-tooltip")
          .forEach(function (e) {
            e.style.visibility = "hidden";
          });
    };
    handleHotspot();
  }, [carHotSpotEnable]);

  return (
    <>
      <Pannellum
        // onScenechange={(id) => {
        //   console.log("Scene has change on " + id);
        // }}
        // onScenechangefadedone={() => {
        //   console.log("panorama loaded");
        // }}
        // onError={(err) => {
        //   console.log("Error", err);
        // }}
        // onErrorcleared={() => {
        //   console.log("Error Cleared");
        // }}
        // onMousedown={(evt) => {
        //   console.log("Mouse Down", evt);
        // }}
        // onMouseup={(evt) => {
        //   console.log("Mouse Up", evt);
        // }}
        getConfig={(data) => console.log(data)}
        width="100%"
        height="100%"
        image={src}
        yaw={yaw}
        pitch={pitch}
        autoLoad
        compass={true}
        showZoomCtrl={false}
        mouseZoom={false}
        showFullscreenCtrl={false}
        onLoad={() => {
          console.log("panorama loaded");
        }}
        hotspotDebug={false}
      >
        <Pannellum.Hotspot
          type="custom"
          pitch={-10}
          yaw={-120}
          handleClick={(evt, name) => handleClick(evt, name)}
          cssClass="custom-hotspot"
          tooltip={hotspot}
          createTooltipArgs="Baltimore Museum of Art"
          handleClickArg={{ name: "test1" }}
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={-10}
          yaw={-50}
          handleClick={(evt, name) => handleClick(evt, name)}
          cssClass="custom-hotspot"
          tooltip={hotspot}
          createTooltipArgs="Baltimore Museum of Art"
          handleClickArg={{ name: "test2" }}
        />
      </Pannellum>
      <HotspotDetail />
    </>
  );
}

export default Interior360;
