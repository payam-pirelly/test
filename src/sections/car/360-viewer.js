// extended by react-360-view
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Mouse from "../../utils/base64";

import Hammer from "react-hammerjs";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import LineTo from "./lineto";
import HotspotCard from "./hotspot-card";
import CloseIcon from "../../components/icon/close-icon";
import HotspotPointerIcon from "../../components/icon/hotspot-pointer-icon";
import Fab from "../../components/button/fab";

const LeftButtons = styled("div")(({}) => ({
  top: "50%",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  left: "2rem",
  justifyContent: "space-around",
  gap: 20,
}));

const Canvas = styled("canvas")(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  position: "relative",
}));

const Shadow = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  boxShadow: "rgb(34, 34, 34) 0px 0px 100px inset",
}));

const V360 = styled("div")(({ theme }) => ({
  backgroundColor: "#FFF",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  left: 0,
  transition: "width 0.3s ease",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

class React360Viewer extends Component {
  constructor() {
    super();
    // this.imageContainerRef = React.createRef();
    this.viewPercentageRef = React.createRef();
    this.viewPortElementRef = React.createRef();
    this.canvas = null;
    this.showHotSpotCard = false;
    this.ctx = null;
    this.isMobile = false;
    this.imageData = [];
    this.images = [];
    this.loadedImages = 0;
    this.viewerPercentage = null;
    this.currentImage = null;
    this.currentLeftPosition = this.currentTopPosition = 0;
    this.currentCanvasImage = null;
    this.centerX = 0;
    this.centerY = 0;
    this.movementStart = 0;
    this.movement = false;
    this.speedFactor = 13;
    this.activeImage = 1;
    this.stopAtEdges = false;
    this.currentScale = 1;
    this.x = 0;
    this.y = 0;

    this.state = {
      lastX: 0,
      lastY: 0,
      minScale: 0.5,
      maxScale: 4,
      scale: 0.2,
      customOffset: 10,
      currentScale: 1,
      currentTopPosition: 0,
      currentLeftPosition: 0,
      selectMenuOption: 1,
      currentImage: null,
      dragging: false,
      canvas: null,
      ctx: null,
      dragStart: null,
      currentCanvasImage: null,
      isFullScreen: false,
      viewPortElementWidth: null,
      movementStart: 0,
      movement: false,
      dragSpeed: 150,
      speedFactor: 13,
      activeImage: 1,
      stopAtEdges: false,
      panmode: false,
      currentLoop: 0,
      loopTimeoutId: 0,
      playing: false,
      imagesLoaded: false,
      showHotSpotCard: false,
      x: 0,
      y: 0,
    };

    //this.currentLeftPosition = this.currentLeftPosition.bind(this)
  }

  componentDidMount() {
    this.disableZoomin();

    this.viewerPercentage = this.viewPercentageRef.current;
    //console.log(this.viewerContainerRef.getElementsByClassName('v360-viewport-container'))
    this.viewPortElementRef = this.viewerContainerRef.getElementsByClassName(
      "v360-viewport-container"
    )[0];
    this.fetchData();
    document.body.style.cursor = `url('data:image/svg+xml;base64,${Mouse.pointImage64}'),auto`;
  }

  componentWillUnmount() {
    document.body.style.cursor = "default";
  }

  fetchData() {
    for (let i = 1; i <= this.props.amount; i++) {
      const imageIndex = this.props.paddingIndex ? this.lpad(i, "0", 2) : i;
      const fileName = this.props.fileName.replace("{index}", imageIndex);
      const filePath = `${this.props.imagePath}/${fileName}`;
      this.imageData.push(filePath);
    }

    this.preloadImages();
  }

  lpad(str, padString, length) {
    str = str.toString();
    while (str.length < length) str = padString + str;
    return str;
  }

  preloadImages() {
    if (this.imageData.length) {
      try {
        //this.props.amount = this.imageData.length;
        this.imageData.forEach((src) => {
          this.addImage(src);
        });
      } catch (error) {
        console.error(
          `Something went wrong while loading images: ${error.message}`
        );
      }
    } else {
      console.log("No Images Found");
    }
  }

  addImage(resultSrc) {
    const image = new Image();
    image.src = resultSrc;
    //image.crossOrigin='anonymous'
    image.onload = this.onImageLoad.bind(this);
    image.onerror = this.onImageLoad.bind(this);
    this.images.push(image);
  }

  onImageLoad(event) {
    const percentage = Math.round(
      (this.loadedImages / this.props.amount) * 100
    );
    this.loadedImages += 1;
    this.updatePercentageInLoader(percentage);
    if (this.loadedImages === this.props.amount) {
      this.onAllImagesLoaded(event);
    } else if (this.loadedImages === 1) {
      //this.onFirstImageLoaded(event);
      console.log("load first image");
    }
  }

  updatePercentageInLoader(percentage) {
    /* if (this.loader) {
            this.loader.style.width = percentage + '%';
        }
        if (this.view360Icon) {
            this.view360Icon.innerText = percentage + '%';
        } */
    //console.log(percentage)
    this.viewerPercentage.innerHTML = percentage + "%";
    //console.log(percentage + '%')
  }

  onAllImagesLoaded(e) {
    this.setState({ imagesLoaded: true });

    this.initData();
  }

  initData() {
    //console.log(this.imageContainerRef)
    this.canvas = this.imageContainerRef;
    this.ctx = this.canvas.getContext("2d");
    //console.log('initialize data here')

    this.attachEvents();

    this.checkMobile();
    this.loadInitialImage();

    this.setState({ playing: this.props.autoplay });
  }

  attachEvents() {
    if (this.state.panmode) {
      this.bindPanModeEvents();
    } else {
      this.bind360ModeEvents();
    }
  }

  bindPanModeEvents() {
    this.viewPortElementRef.removeEventListener("touchend", this.touchEnd);
    this.viewPortElementRef.removeEventListener("touchstart", this.touchStart);
    this.viewPortElementRef.removeEventListener("touchmove", this.touchMove);

    this.viewPortElementRef.addEventListener("touchend", this.stopDragging);
    this.viewPortElementRef.addEventListener("touchstart", this.startDragging);
    this.viewPortElementRef.addEventListener("touchmove", this.doDragging);

    this.viewPortElementRef.removeEventListener("mouseup", this.stopMoving);
    this.viewPortElementRef.removeEventListener("mousedown", this.startMoving);
    this.viewPortElementRef.removeEventListener("mousemove", this.doMoving);

    this.viewPortElementRef.addEventListener("mouseup", this.stopDragging);
    this.viewPortElementRef.addEventListener("mousedown", this.startDragging);
    this.viewPortElementRef.addEventListener("mousemove", this.doDragging);
  }

  bind360ModeEvents() {
    this.viewPortElementRef.removeEventListener("touchend", this.stopDragging);
    this.viewPortElementRef.removeEventListener(
      "touchstart",
      this.startDragging
    );
    this.viewPortElementRef.removeEventListener("touchmove", this.doDragging);

    this.viewPortElementRef.addEventListener("touchend", this.touchEnd);
    this.viewPortElementRef.addEventListener("touchstart", this.touchStart);
    this.viewPortElementRef.addEventListener("touchmove", this.touchMove);

    this.viewPortElementRef.removeEventListener("mouseup", this.stopDragging);
    this.viewPortElementRef.removeEventListener(
      "mousedown",
      this.startDragging
    );
    this.viewPortElementRef.removeEventListener("mousemove", this.doDragging);

    this.viewPortElementRef.addEventListener("mouseup", this.stopMoving);
    this.viewPortElementRef.addEventListener("mousedown", this.startMoving);
    this.viewPortElementRef.addEventListener("mousemove", this.doMoving);
  }

  startDragging = (evt) => {
    this.dragging = true;
    document.body.style.mozUserSelect =
      document.body.style.webkitUserSelect =
      document.body.style.userSelect =
        "none";
    this.setLastPositions(evt);

    this.dragStart = this.ctx.transformedPoint(
      this.state.lastX,
      this.state.lastY
    );
  };

  setLastPositions(evt) {
    if (this.isMobile) {
      this.setState({
        lastX:
          evt.touches[0].offsetX ||
          evt.touches[0].pageX - this.canvas.offsetLeft,
        lastY:
          evt.touches[0].offsetY ||
          evt.touches[0].pageY - this.canvas.offsetTop,
      });
    } else {
      this.setState({
        lastX: evt.offsetX || evt.pageX - this.canvas.offsetLeft,
        lastY: evt.offsetY || evt.pageY - this.canvas.offsetTop,
      });
    }
  }

  doDragging = (evt) => {
    this.setLastPositions(evt);

    if (this.dragStart) {
      let pt = this.ctx.transformedPoint(this.state.lastX, this.state.lastY);
      this.ctx.translate(pt.x - this.dragStart.x, pt.y - this.dragStart.y);
      //redraw();
      this.redraw();
    }
  };

  stopDragging = (evt) => {
    this.dragging = false;
    this.dragStart = null;
  };

  checkMobile() {
    this.isMobile = !!("ontouchstart" in window || navigator.msMaxTouchPoints);
  }

  loadInitialImage() {
    this.currentImage = this.imageData[0];
    this.setImage();
  }

  setImage(cached = false) {
    this.currentLeftPosition = this.currentTopPosition = 0;

    if (!cached) {
      this.currentCanvasImage = new Image();
      this.currentCanvasImage.crossOrigin = "anonymous";
      this.currentCanvasImage.src = this.currentImage;
      this.currentCanvasImage.onload = () => {
        let viewportElement = this.viewPortElementRef.getBoundingClientRect();
        this.canvas.width = this.state.isFullScreen
          ? viewportElement.width
          : this.currentCanvasImage.width;
        this.canvas.height = this.state.isFullScreen
          ? viewportElement.height
          : this.currentCanvasImage.height;
        this.trackTransforms(this.ctx);
        this.redraw();
      };
      this.currentCanvasImage.onerror = () => {
        console.log("cannot load this image");
      };
    } else {
      this.currentCanvasImage = this.images[0];
      let viewportElement = this.viewPortElementRef.getBoundingClientRect();
      this.canvas.width = this.state.isFullScreen
        ? viewportElement.width
        : this.currentCanvasImage.width;
      this.canvas.height = this.state.isFullScreen
        ? viewportElement.height
        : this.currentCanvasImage.height;
      this.trackTransforms(this.ctx);
      this.redraw();
    }
  }

  redraw() {
    try {
      let p1 = this.ctx.transformedPoint(0, 0);
      let p2 = this.ctx.transformedPoint(this.canvas.width, this.canvas.height);
      let hRatio = this.canvas.width / this.currentCanvasImage.width;
      let vRatio = this.canvas.height / this.currentCanvasImage.height;
      let ratio = Math.min(hRatio, vRatio);
      let centerShift_x =
        (this.canvas.width - this.currentCanvasImage.width * ratio) / 2;
      let centerShift_y =
        (this.canvas.height - this.currentCanvasImage.height * ratio) / 2;
      this.ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
      this.centerX = (this.currentCanvasImage.width * ratio) / 2;
      this.centerY = (this.currentCanvasImage.height * ratio) / 2;

      //center image
      this.ctx.drawImage(
        this.currentCanvasImage,
        this.currentLeftPosition,
        this.currentTopPosition,
        this.currentCanvasImage.width,
        this.currentCanvasImage.height,
        centerShift_x,
        centerShift_y,
        this.currentCanvasImage.width * ratio,
        this.currentCanvasImage.height * ratio
      );
      //this.addHotspots()
    } catch (e) {
      this.trackTransforms(this.ctx);
    }
  }

  trackTransforms(ctx) {
    return new Promise((resolve) => {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var xform = svg.createSVGMatrix();
      this.ctx.getTransform = function () {
        return xform;
      };

      var savedTransforms = [];
      var save = ctx.save;
      this.ctx.save = () => {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(this.ctx);
      };
      var restore = ctx.restore;
      this.ctx.restore = () => {
        xform = savedTransforms.pop();
        return restore.call(this.ctx);
      };
      var scale = this.ctx.scale;
      this.ctx.scale = (sx, sy) => {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(this.ctx, sx, sy);
      };
      var rotate = this.ctx.rotate;
      this.ctx.rotate = (radians) => {
        xform = xform.rotate((radians * 180) / Math.PI);
        return rotate.call(this.ctx, radians);
      };
      var translate = this.ctx.translate;
      this.ctx.translate = (dx, dy) => {
        xform = xform.translate(dx, dy);
        return translate.call(this.ctx, dx, dy);
      };
      var transform = this.ctx.transform;
      this.ctx.transform = (a, b, c, d, e, f) => {
        var m2 = svg.createSVGMatrix();
        m2.a = a;
        m2.b = b;
        m2.c = c;
        m2.d = d;
        m2.e = e;
        m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(this.ctx, a, b, c, d, e, f);
      };
      var setTransform = this.ctx.setTransform;
      this.ctx.setTransform = (a, b, c, d, e, f) => {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(this.ctx, a, b, c, d, e, f);
      };
      var pt = svg.createSVGPoint();
      this.ctx.transformedPoint = (x, y) => {
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(xform.inverse());
      };
      resolve(this.ctx);
    });
  }

  prev = (e) => {
    //console.log(this.currentLeftPosition)
    /* this.setState({
            currentLeftPosition: 10
        }) */
    //this.currentLeftPosition = 10
    this.props.spinReverse ? this.turnRight() : this.turnLeft();
  };

  next = (e) => {
    this.props.spinReverse ? this.turnLeft() : this.turnRight();
  };

  resetPosition = () => {
    this.currentScale = 1;
    this.activeImage = 1;
    this.setImage(true);
  };

  turnLeft() {
    this.moveActiveIndexDown(1);
  }

  turnRight() {
    this.moveActiveIndexUp(1);
  }

  moveActiveIndexUp(itemsSkipped) {
    if (this.stopAtEdges) {
      if (this.activeImage + itemsSkipped >= this.props.amount) {
        this.activeImage = this.props.amount;
      } else {
        this.activeImage += itemsSkipped;
      }
    } else {
      this.activeImage =
        (this.activeImage + itemsSkipped) % this.props.amount ||
        this.props.amount;
    }

    this.update();
  }

  moveActiveIndexDown(itemsSkipped) {
    if (this.stopAtEdges) {
      if (this.activeImage - itemsSkipped <= 1) {
        this.activeImage = 1;
      } else {
        this.activeImage -= itemsSkipped;
      }
    } else {
      if (this.activeImage - itemsSkipped < 1) {
        this.activeImage =
          this.props.amount + (this.activeImage - itemsSkipped);
      } else {
        this.activeImage -= itemsSkipped;
      }
    }

    this.update();
  }

  update() {
    this.setState({ activeImage: this.activeImage });
    const image = this.images[this.activeImage - 1];
    this.currentCanvasImage = image;
    this.redraw();
  }

  zoomImage = (evt) => {
    this.setState({
      lastX: evt.offsetX || evt.pageX - this.canvas.offsetLeft,
      lastY: evt.offsetY || evt.pageY - this.canvas.offsetTop,
    });

    var delta = evt.wheelDelta
      ? evt.wheelDelta / 40
      : evt.deltaY
      ? -evt.deltaY
      : 0;

    if (delta) this.zoom(delta);
    //return evt.preventDefault() && false;
  };

  zoomIn = (evt) => {
    this.setState({
      lastX: this.centerX,
      lastY: this.centerY,
    });
    //this.lastY = this.centerY
    this.zoom(1);
  };

  zoomOut = (evt) => {
    this.setState({
      lastX: this.centerX,
      lastY: this.centerY,
    });
    this.zoom(-1);
  };

  zoom(zoom) {
    this.setState({ currentScale: (this.currentScale += zoom) });
    // //console.log(this.lastX + ' - ' + this.lastY)
    // // let factor = Math.pow(1.01, clicks);
    // let factor = Math.pow(1.1, clicks);
    // //console.log(factor)
    // if (factor > 1) {
    //   this.currentScale += factor;
    //   console.log("1", factor);
    //   console.log("1", this.currentScale);
    // } else {
    //   console.log("2");
    //   if (this.currentScale - factor > 1) this.currentScale -= factor;
    //   else {
    //     console.log("2");
    //     this.currentScale = 1;
    //   }
    // }
    // if (this.currentScale > 1) {
    //   console.log("2");
    //   let pt = this.ctx.transformedPoint(this.state.lastX, this.state.lastY);
    //   this.ctx.translate(pt.x, pt.y);
    //   //console.log(this.currentScale)
    //   this.ctx.scale(factor, factor);
    //   this.ctx.translate(-pt.x, -pt.y);
    //   this.redraw();
    // }
  }

  disableZoomin() {
    // document.addEventListener("gesturestart", function (e) {
    //   e.preventDefault();
    //   document.body.style.zoom = 0.99;
    // });
    // document.addEventListener("gesturechange", function (e) {
    //   e.preventDefault();
    //   document.body.style.zoom = 0.99;
    // });
    // document.addEventListener("gestureend", function (e) {
    //   e.preventDefault();
    //   document.body.style.zoom = 1;
    // });
  }

  onMove(pageX) {
    if (pageX - this.movementStart >= this.speedFactor) {
      //   let itemsSkippedRight = Math.floor((pageX - this.movementStart) / this.speedFactor) || 1;
      let itemsSkippedRight = 1;

      console.log(itemsSkippedRight);
      this.movementStart = pageX;
      if (this.props.spinReverse) {
        this.moveActiveIndexDown(itemsSkippedRight);
      } else {
        this.moveActiveIndexUp(itemsSkippedRight);
      }
      this.redraw();
    } else if (this.movementStart - pageX >= this.speedFactor) {
      console.log("G");
      let itemsSkippedLeft = 1;
      //   let itemsSkippedLeft = Math.floor((this.movementStart - pageX) / this.speedFactor) || 1;

      this.movementStart = pageX;
      if (this.props.spinReverse) {
        this.moveActiveIndexUp(itemsSkippedLeft);
      } else {
        this.moveActiveIndexDown(itemsSkippedLeft);
      }
      this.redraw();
    }
    console.log(this.activeImage);
  }

  startMoving = (evt) => {
    this.movement = true;
    this.movementStart = evt.pageX;
    // this.viewPortElementRef.style.cursor = "grabbing";
    document.body.style.cursor = `url('data:image/svg+xml;base64,${Mouse.dragImage64}'),auto`;
  };

  doMoving = (evt) => {
    if (this.currentScale > 1) return;
    if (this.movement) {
      this.onMove(evt.clientX);
    }
  };

  handleDragging = (evt) => {
    console.log(evt);
    if (this.currentScale > 1 && this.movement) {
      const { clientX, clientY } = evt;
      // console.log(movementX, movementY);
      // this.setState({ x: clientX, y: clientY });
      // if (this.currentScale > 1) return;
      // if (this.movement) {
      //   this.onMove(evt.clientX);
      // }
    }
  };

  stopMoving = (evt) => {
    this.movement = false;
    this.movementStart = 0;
    // this.viewPortElementRef.style.cursor = "grab";
    document.body.style.cursor = `url('data:image/svg+xml;base64,${Mouse.pointImage64}'),auto`;
  };

  touchStart = (evt) => {
    this.movementStart = evt.touches[0].clientX;
  };

  touchMove = (evt) => {
    this.onMove(evt.touches[0].clientX);
  };

  touchEnd = () => {
    this.movementStart = 0;
  };

  play = (e) => {
    this.setState({
      loopTimeoutId: window.setInterval(() => this.loopImages(), 100),
    });
  };

  onSpin() {
    if (this.state.playing || this.state.loopTimeoutId) {
      this.stop();
    }
  }

  stop() {
    if (this.activeImage === 1) {
      this.setState({ currentLoop: 0 });
    }
    this.setState({ playing: false });
    window.clearTimeout(this.state.loopTimeoutId);
  }

  loopImages() {
    let loop = this.props.loop ? this.props.loop : 1;

    if (this.activeImage === 1) {
      if (this.state.currentLoop === loop) {
        this.stop();
      } else {
        this.setState({ currentLoop: this.state.currentLoop + 1 });

        this.next();
      }
    } else {
      this.next();
    }
  }

  togglePlay = (e) => {
    this.setState({ playing: !this.state.playing });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentLeftPosition !== prevState.currentLeftPosition) {
      console.log("Left Position Changed");
    }

    if (this.state.panmode !== prevState.panmode) {
      this.attachEvents();
    }

    if (this.state.playing !== prevState.playing) {
      if (!this.state.playing) {
        this.stop();
      } else {
        this.play();
      }
    }
  }

  handlePinch = (e) => {
    if (e.scale < this.currentScale) {
      // zoom in
      this.zoomIn();
    } else if (e.scale > this.currentScale) {
      // zoom out
      this.zoomOut();
    }
  };

  pinchOut = () => {
    this.currentScale = 1;
  };

  handleClick = (data) => {
    this.showHotSpotCard = data;
    this.setState({ showHotSpotCard: data });
  };

  render() {
    console.log(this.showHotSpotCard);
    return (
      <div
        style={{
          width: this.props?.width,
        }}
        ref={(inputEl) => (this.viewerContainerRef = inputEl)}
        // onWheel={(e) => this.zoomImage(e)}
      >
        {!this.state.imagesLoaded ? (
          <p ref={this.viewPercentageRef}>loading...</p>
        ) : (
          ""
        )}
        <Hammer
          onPinchIn={this.handlePinch}
          onPinchOut={this.handlePinch}
          onPinchEnd={this.pinchOut}
          options={{
            recognizers: {
              pinch: { enable: true },
            },
          }}
        >
          <V360
            // onMouseMove={this.handleDragging}
            className="v360-viewport-container"
            sx={{
              transform: `translate3d(${this.state.x}px, ${
                this.state.y
              }px, ${0}px) scale(${this.state.currentScale})`,
            }}
          >
            <Canvas ref={(inputEl) => (this.imageContainerRef = inputEl)} />
            {this.activeImage === 1 && this.props.isHotspot && (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  top:
                    (this.imageContainerRef?.getBoundingClientRect()?.height /
                      100) *
                    52,
                  left:
                    (this.imageContainerRef?.getBoundingClientRect()?.width /
                      100) *
                    50,
                  display: "flex",
                }}
              >
                <Tooltip title={"Hood"}>
                  <IconButton
                    sx={{ zIndex: (theme) => theme.zIndex.tooltip }}
                    className="A"
                    onClick={() => {
                      if (this.showHotSpotCard) this.handleClick(false);
                      else this.handleClick(true);
                    }}
                  >
                    {this.showHotSpotCard ? (
                      <CloseIcon />
                    ) : (
                      <HotspotPointerIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {this.props.boxShadow ? <Shadow /> : ""}
          </V360>
        </Hammer>
        <LeftButtons>
          <Fab
            icon={<AddRoundedIcon color="secondary" />}
            onClick={this.zoomIn}
            disabled={this.currentScale > 2 ? true : false}
          />
          <Fab
            icon={<RemoveRoundedIcon color="secondary" />}
            onClick={this.zoomOut}
            disabled={this.currentScale === 1 ? true : false}
          />
        </LeftButtons>
        <LineTo
          from="A"
          to="B"
          borderColor={"#1862E3"}
          // borderStyle={"dashed"}
          delay={10}
        />
        {this.showHotSpotCard && (
          <>
            {/* <div
              style={{
                borderTop: "1px dashed rgb(24, 98, 227)",
                position: "absolute",
                top: "519.734px",
                left: "721.5px",
                width: "455.779px",
                zIndex: 1,
                transform: "rotate(-136.846deg)",
                transformOrigin: "0px 0px",
              }}
            ></div> */}
            <HotspotCard
              onClick={() => this.handleClick(false)}
              opacity={this.showHotSpotCard ? 1 : 0}
            />
          </>
        )}
      </div>
    );
  }
}

export default React360Viewer;
