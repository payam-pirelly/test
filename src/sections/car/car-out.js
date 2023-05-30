import React from "react";
import { useMemo } from "react";
import ShowCars from "./cars-list";
import CarButtons from "./car-buttons";
import ThreeSixtyView from "./three-sixty";
import { useDispatch, useSelector } from "react-redux";
import { toggledCarTabIndex } from "../../redux/car-slice";
import Interior360 from "./pannellum";

export default function CarOut() {
  const { carTabIndex } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(toggledCarTabIndex(newValue));
  };

  const renderContent = useMemo(() => {
    switch (carTabIndex) {
      case 0:
        return <ThreeSixtyView />;
      case 1:
        return <Interior360 />;
      case 2:
        return <ShowCars />;
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
