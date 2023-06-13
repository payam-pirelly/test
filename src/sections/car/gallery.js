import React from "react";
import CarsList from "./cars-list";
import GalleryItem from "./gallery-item";
import { isMobile } from "react-device-detect";

export default function Gallery() {
  return (
    <>
      <GalleryItem />
      {!isMobile && <CarsList />}
    </>
  );
}
