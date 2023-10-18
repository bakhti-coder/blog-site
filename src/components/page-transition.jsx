import { motion } from "framer-motion";
import PropTypes from "prop-types";

export function PageTransitionProvider({ children }) {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          translateY: 30,
        }}
        exit={{
          opacity: 0,
          translateY: -30,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
PageTransitionProvider.propTypes = {
  children: PropTypes.node,
};

export default PageTransitionProvider;
