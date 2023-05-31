import React from "react";
import PropTypes from "prop-types";
import { Fab as MUIFab } from "@mui/material";

export default function Fab({ icon, onClick, disabled, color, ...props }) {
  return (
    <MUIFab
      size="small"
      color={color}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon}
    </MUIFab>
  );
}

Fab.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
