import React360Viewer from "./360-viewer";
import { useSelector } from "react-redux";
import ShowWindowDimensions from "../../utils/resize";

const basePath = "https://fastly-production.24c.in/webin/360";

export default function Exterior360() {
  const { carHotSpotEnable } = useSelector((state) => state.car);

  const { width } = ShowWindowDimensions();

  return (
    <React360Viewer
      width={width}
      amount={75}
      imagePath={basePath}
      fileName="output_{index}.jpeg"
      boxShadow
      spinReverse
      // autoplay
      buttonClass="light"
      carHotSpotEnable={carHotSpotEnable}
    />
  );
}
