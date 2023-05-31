import React, { useEffect, useState } from "react";
import { Pannellum } from "pannellum-react";

import { useSelector } from "react-redux";
import HotspotDetail from "./hotspot-detail";

function Interior360() {
  const { interiorCarStatus, isHotspot } = useSelector((state) => state.car);
  const src = `/images/${interiorCarStatus}.jpg`;

  const [showTooltip, setShowTooltip] = useState(false);

  // Hot spot creation function
  // function hotspot(hotSpotDiv, args) {
  //   hotSpotDiv.classList.add("custom-tooltip");
  //   var span = document.createElement("span");
  //   span.innerHTML = args;
  //   hotSpotDiv.appendChild(span);
  //   span.style.width = span.scrollWidth - 20 + "px";
  //   span.style.marginLeft =
  //     -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + "px";
  //   span.style.marginTop = -span.scrollHeight - 12 + "px";
  // }

  const hotspot = (hotSpotDiv, args) => {
    const imageDiv = document.createElement("img");
    imageDiv.setAttribute("width", "45");
    imageDiv.setAttribute("height", "45");
    imageDiv.classList.add("pirelly-custom-tooltip");
    imageDiv.setAttribute("src", "hotspot-point.svg"); // https://img.icons8.com/ios/1600/circled-up-filled.png
    hotSpotDiv.appendChild(imageDiv);
  };

  // const click = () => {
  //   console.log(getConfig());
  // };

  // const [pitch, setPitch] = useState(100);
  // const [yaw, setYaw] = useState(-180);
  // const [hfov, setHfov] = useState(180);

  // const hotspot = (hotSpotDiv) => {
  //   const image = document.createElement("img");
  //   image.classList.add("image");
  //   image.setAttribute("width", "30");
  //   image.setAttribute("height", "30");
  //   image.setAttribute("src", "https://img.icons8.com/material/4ac144/256/camera.png");
  //   hotSpotDiv.appendChild(image);
  // };

  const [yaw, setYaw] = useState(0); // move in x -180,180
  const [pitch, setPitch] = useState(0); // move in y -180,180

  const handleClick = (evt, name) => {
    console.log(evt);
    setShowTooltip(true);

    setYaw(-120);
    setPitch(-10);
  };

  const handleClose = () => {
    setPitch(0);
    setYaw(0);
    setShowTooltip(false);
  };

  // const element = document.getElementsByClassName("pnlm-render-container")[0];
  const element = document.querySelector(".pnlm-container");
  // element?.remove()
  console.log(element);
  useEffect(() => {
    if (isHotspot)
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
  }, [isHotspot]);

  return (
    <>
      <Pannellum
        getConfig={(data) => console.log(data)}
        width="100%"
        height="100%"
        image={src}
        yaw={yaw}
        pitch={pitch}
        // hfov={110}
        // autoRotate={-5}
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
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={-100}
          yaw={120}
          handleClick={(evt, name) => handleClick(evt, name)}
          cssClass="custom-hotspot"
          tooltip={hotspot}
          createTooltipArgs="Baltimore Museum of Art"
        />
      </Pannellum>
      <HotspotDetail open={showTooltip} handleClose={handleClose} />
    </>
  );
}

export default Interior360;
