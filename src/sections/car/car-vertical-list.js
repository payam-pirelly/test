import { IconButton, ImageList, ImageListItem } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toggledCarStatus, toggledCarTabIndex } from "../../redux/car-slice";
import ShowWindowDimensions from "../../utils/resize";

const imagePath = "https://fastly-production.24c.in/webin/360/output_1.jpeg";

export default function CarVerticalList({ onClick }) {
  const items = [1, 2, 3, 4];
  const dispatch = useDispatch();
  const { width } = ShowWindowDimensions();

  const handleClickCarIn = () => {
    dispatch(toggledCarStatus("carOut"));
    dispatch(toggledCarTabIndex(1));
    onClick();
  };

  return (
    <ImageList
      sx={{
        width: "auto",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {items.map((item) => (
        <ImageListItem key={item} sx={{ display: "block" }}>
          <img
            src={imagePath}
            srcSet={imagePath}
            alt={item}
            loading="lazy"
            style={{ borderRadius: 10 }}
          />
        </ImageListItem>
      ))}
      <Box position="absolute" left="5%" top="50%" zIndex={1}>
        <IconButton onClick={handleClickCarIn}>
          <img
            src="/interior360.svg"
            alt="interior.svg"
            width={width * 0.09}
            height="auto"
          />
        </IconButton>
      </Box>
    </ImageList>
  );
}

// import { IconButton, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import * as React from "react";
// import { useDispatch } from "react-redux";
// import { toggledCarStatus, toggledCarTabIndex } from "../../redux/car-slice";
// import ShowWindowDimensions from "../../utils/resize";

// export default function CarVerticalList({ onClick }) {
//   const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   const dispatch = useDispatch();
//   const { width } = ShowWindowDimensions();
//   const handleClickCarIn = () => {
//     dispatch(toggledCarStatus("carOut"));
//     dispatch(toggledCarTabIndex(1));
//     onClick();
//   };

//   const handleClickCarGallery = () => {
//     dispatch(toggledCarStatus("carOut"));
//     dispatch(toggledCarTabIndex(2));
//     onClick();
//   };

//   return (
//     <ul
//       style={{
//         position: "relative",
//         margin: 0,
//         padding: 0,
//         display: "flex",
//         flexDirection: "row",
//         width: "100%",
//         overflowX: "auto",
//         listStyle: "none",
//         gap: 5,
//       }}
//     >
//       {items?.map((item) => (
//         <li
//           style={{
//             flex: "0 0 auto",
//             width: 200,
//             height: "auto",
//           }}
//         >
//           <img
//             width={200}
//             style={{ height: "auto", objectFit: "contain", borderRadius: 10 }}
//             src={`./images/${item}.jpg`}
//             alt={item}
//             loading="lazy"
//           />
//         </li>
//       ))}
//       <Box position="absolute" left="5%" top="50%" zIndex={1}>
//         <IconButton onClick={handleClickCarIn} sx={{ padding: 0 }}>
//           <img
//             width={width * 0.09}
//             src="/interior360.svg"
//             alt="interior.svg"
//             height="auto"
//           />
//         </IconButton>
//       </Box>
//       <Box position="absolute" right="5%" top="80%" zIndex={1}>
//         <IconButton onClick={handleClickCarGallery} sx={{ padding: 0 }}>
//           <Typography variant="h4" gutterBottom color={"white"}>
//             {/* +{items?.length} */}
//           </Typography>
//         </IconButton>
//       </Box>
//     </ul>
//   );
// }
