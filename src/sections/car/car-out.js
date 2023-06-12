import React from "react";
import { useMemo } from "react";
import CarButtons from "./car-buttons";
import { useDispatch, useSelector } from "react-redux";
import { toggledCarTabIndex } from "../../redux/car-slice";
import Exterior360 from "./exterior-360";
import Interior360 from "./interior-360";
import CarsList from "./cars-list";

export default function CarOut() {
  const { carTabIndex } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(toggledCarTabIndex(newValue));
  };

  const renderContent = useMemo(() => {
    switch (carTabIndex) {
      case 0:
        return <Exterior360 />;
      case 1:
        return <Interior360 />;
      case 2:
        return <CarsList />;
      case 3:
        return 4;
      default:
        break;
    }
  }, [carTabIndex]);

  return (
    <>
      {renderContent}
      <CarButtons value={carTabIndex} handleTabChange={handleChange} />
    </>
  );
}
