import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";

const R360Viewer = ({ amount, paddingIndex, getFileName, imagePath, autoplay }) => {
  const viewPercentageRef = useRef();
  const viewPortElementRef = useRef();
  const viewerContainerRef = useRef();
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [viewerPercentage, setViewerPercentage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentLeftPosition, setCurrentLeftPosition] = useState(0);
  const [currentCanvasImage, setCurrentCanvasImage] = useState(null);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [movementStart, setMovementStart] = useState(0);
  const [movement, setMovement] = useState(false);
  const [speedFactor, setSpeedFactor] = useState(13);
  const [activeImage, setActiveImage] = useState(1);
  const [stopAtEdges, setStopAtEdges] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [minScale, setMinScale] = useState(0.5);
  const [maxScale, setMaxScale] = useState(4);
  const [scale, setScale] = useState(0.2);
  const [customOffset, setCustomOffset] = useState(10);
  const [currentScale, setCurrentScale] = useState(1);
  const [currentTopPosition, setCurrentTopPosition] = useState(0);
  const [selectMenuOption, setSelectMenuOption] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [viewPortElementWidth, setViewPortElementWidth] = useState(null);
  const [dragSpeed, setDragSpeed] = useState(150);
  const [panmode, setPanmode] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [loopTimeoutId, setLoopTimeoutId] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const disableZoomin = () => {
    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
      document.body.style.zoom = 0.99;
    });
    document.addEventListener("gesturechange", function (e) {
      e.preventDefault();
      document.body.style.zoom = 0.99;
    });

    document.addEventListener("gestureend", function (e) {
      e.preventDefault();
      document.body.style.zoom = 1;
    });
  };

  const lpad = (str, padString, length) => {
    str = str.toString();
    while (str.length < length) str = padString + str;
    return str;
  };

  const bindPanModeEvents = () => {
    viewPortElementRef.removeEventListener("touchend", touchEnd);
    viewPortElementRef.removeEventListener("touchstart", touchStart);
    viewPortElementRef.removeEventListener("touchmove", touchMove);

    viewPortElementRef.addEventListener("touchend", stopDragging);
    viewPortElementRef.addEventListener("touchstart", startDragging);
    viewPortElementRef.addEventListener("touchmove", doDragging);

    viewPortElementRef.removeEventListener("mouseup", stopMoving);
    viewPortElementRef.removeEventListener("mousedown", startMoving);
    viewPortElementRef.removeEventListener("mousemove", doMoving);

    viewPortElementRef.addEventListener("mouseup", stopDragging);
    viewPortElementRef.addEventListener("mousedown", startDragging);
    viewPortElementRef.addEventListener("mousemove", doDragging);
  };

  const bind360ModeEvents = () => {
    viewPortElementRef.removeEventListener("touchend", stopDragging);
    viewPortElementRef.removeEventListener("touchstart", startDragging);
    viewPortElementRef.removeEventListener("touchmove", doDragging);

    viewPortElementRef.addEventListener("touchend", touchEnd);
    viewPortElementRef.addEventListener("touchstart", touchStart);
    viewPortElementRef.addEventListener("touchmove", touchMove);

    viewPortElementRef.removeEventListener("mouseup", stopDragging);
    viewPortElementRef.removeEventListener("mousedown", startDragging);
    viewPortElementRef.removeEventListener("mousemove", doDragging);

    viewPortElementRef.addEventListener("mouseup", stopMoving);
    viewPortElementRef.addEventListener("mousedown", startMoving);
    viewPortElementRef.addEventListener("mousemove", doMoving);
  };

  const attachEvents = () => {
    if (panmode) {
      bindPanModeEvents();
    } else {
      bind360ModeEvents();
    }
  };

  const checkMobile = () => {
    setIsMobile((isMobile = !!("ontouchstart" in window || navigator.msMaxTouchPoints)));
  };

  const trackTransforms = (ctx) => {
    return new Promise((resolve) => {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var xform = svg.createSVGMatrix();
      ctx.getTransform = function () {
        return xform;
      };

      var savedTransforms = [];
      var save = ctx.save;
      ctx.save = () => {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(this.ctx);
      };
      var restore = ctx.restore;
      ctx.restore = () => {
        xform = savedTransforms.pop();
        return restore.call(this.ctx);
      };
      var scale = ctx.scale;
      ctx.scale = (sx, sy) => {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(this.ctx, sx, sy);
      };
      var rotate = ctx.rotate;
      ctx.rotate = (radians) => {
        xform = xform.rotate((radians * 180) / Math.PI);
        return rotate.call(ctx, radians);
      };
      var translate = ctx.translate;
      ctx.translate = (dx, dy) => {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
      };
      var transform = ctx.transform;
      ctx.transform = (a, b, c, d, e, f) => {
        var m2 = svg.createSVGMatrix();
        m2.a = a;
        m2.b = b;
        m2.c = c;
        m2.d = d;
        m2.e = e;
        m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
      };
      var setTransform = ctx.setTransform;
      ctx.setTransform = (a, b, c, d, e, f) => {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(this.ctx, a, b, c, d, e, f);
      };
      var pt = svg.createSVGPoint();
      ctx.transformedPoint = (x, y) => {
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(xform.inverse());
      };
      resolve(this.ctx);
    });
  };

  const redraw = () => {
    try {
      let p1 = ctx.transformedPoint(0, 0);
      let p2 = ctx.transformedPoint(canvas.width, canvas.height);
      let hRatio = canvas.width / currentCanvasImage.width;
      let vRatio = canvas.height / currentCanvasImage.height;
      let ratio = Math.min(hRatio, vRatio);
      let centerShift_x = (canvas.width - currentCanvasImage.width * ratio) / 2;
      let centerShift_y = (canvas.height - currentCanvasImage.height * ratio) / 2;
      ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
      centerX = (currentCanvasImage.width * ratio) / 2;
      centerY = (currentCanvasImage.height * ratio) / 2;

      //center image
      ctx.drawImage(
        currentCanvasImage,
        currentLeftPosition,
        currentTopPosition,
        currentCanvasImage.width,
        currentCanvasImage.height,
        centerShift_x,
        centerShift_y,
        currentCanvasImage.width * ratio,
        currentCanvasImage.height * ratio
      );
      setCurrentCanvasImage(currentCanvasImage);
      //this.addHotspots()
    } catch (e) {
      trackTransforms(this.ctx);
    }
  };

  const setImage = (cached = false) => {
    setCurrentLeftPosition(0);
    setCurrentTopPosition(0);

    if (!cached) {
      setCurrentCanvasImage(new Image());
      currentCanvasImage.crossOrigin = "anonymous";
      currentCanvasImage.src = currentImage;
      currentCanvasImage.onload = () => {
        let viewportElement = viewPortElementRef.getBoundingClientRect();
        canvas.width = isFullScreen ? viewportElement.width : currentCanvasImage.width;
        canvas.height = isFullScreen ? viewportElement.height : currentCanvasImage.height;
        trackTransforms(ctx);
        redraw();
      };
      currentCanvasImage.onerror = () => {
        console.log("cannot load this image");
      };
    } else {
      currentCanvasImage = images[0];
      setCurrentCanvasImage(images[0]);
      let viewportElement = viewPortElementRef.getBoundingClientRect();
      canvas.width = state.isFullScreen ? viewportElement.width : currentCanvasImage.width;
      canvas.height = state.isFullScreen ? viewportElement.height : currentCanvasImage.height;
      trackTransforms(ctx);
      redraw();
    }
  };

  const loadInitialImage = () => {
    setCurrentImage(imageData[0]);
    setImage();
  };

  const initData = () => {
    //console.log(this.imageContainerRef)
    setCanvas(imageContainerRef);
    setCtx(canvas.getContext("2d"));
    //console.log('initialize data here')

    attachEvents();

    checkMobile();
    loadInitialImage();

    setPlaying(autoplay);
  };
  const onAllImagesLoaded = (e) => {
    setImagesLoaded(true);

    initData();
  };

  const updatePercentageInLoader = (percentage) => {
    /* if (this.loader) {
            this.loader.style.width = percentage + '%';
        }
        if (this.view360Icon) {
            this.view360Icon.innerText = percentage + '%';
        } */
    //console.log(percentage)
    viewerPercentage.innerHTML = percentage + "%";
    //console.log(percentage + '%')
  };

  const onImageLoad = (event) => {
    const percentage = Math.round((loadedImages / amount) * 100);
    setLoadedImages((prev) => prev++);
    updatePercentageInLoader(percentage);
    if (loadedImages === amount) {
      onAllImagesLoaded(event);
    } else if (loadedImages === 1) {
      //this.onFirstImageLoaded(event);
      console.log("load first image");
    }
  };

  const addImage = (resultSrc) => {
    const image = new Image();
    image.src = resultSrc;
    //image.crossOrigin='anonymous'
    image.onload = onImageLoad(image);
    image.onerror = onImageLoad(image);
    images.push(image);
    setImages(images);
  };

  const preloadImages = () => {
    if (imageData.length) {
      try {
        //this.props.amount = this.imageData.length;
        imageData.forEach((src) => {
          addImage(src);
        });
      } catch (error) {
        console.error(`Something went wrong while loading images: ${error.message}`);
      }
    } else {
      console.log("No Images Found");
    }
  };

  const fetchData = () => {
    for (let i = 1; i <= amount; i++) {
      const imageIndex = paddingIndex ? lpad(i, "0", 2) : i;
      const fileName = getFileName.replace("{index}", imageIndex);
      const filePath = `${imagePath}/${fileName}`;
      imageData.push(filePath);
      setImageData(imageData);
    }

    preloadImages();
  };

  useEffect(() => {
    disableZoomin();
    setViewerPercentage(viewPercentageRef?.current);
    viewPortElementRef.current = viewerContainerRef;
    this.viewPortElementRef =
      viewerContainerRef.getElementsByClassName("v360-viewport-container")[0];
    fetchData();
  }, []);

  return <div></div>;
};
