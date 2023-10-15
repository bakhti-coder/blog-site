import PropTypes from "prop-types";

import { Parallax } from "react-parallax";

export default function ParallaxComponent({
  children,
  bgImage,
  bgImageStyle,
  strength,
  className,
}) {
  return (
    <>
      <Parallax
        className={className}
        bgImage={bgImage}
        bgImageStyle={bgImageStyle}
        strength={strength}
      >
        {children}
      </Parallax>
    </>
  );
}
ParallaxComponent.propTypes = {
  children: PropTypes.node,
  bgImage: PropTypes.any,
  bgImageStyle: PropTypes.any,
  strength: PropTypes.any,
  className: PropTypes.any,
};
