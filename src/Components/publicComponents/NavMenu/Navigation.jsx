import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./menuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    width: "20%",
  },
  closed: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.8 },
  },
};

export const Navigation = (isOpen) => {
  isOpen = isOpen.open;
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRight: "2px solid black",
        background: "#fff",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
      }}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      <motion.ul className="ulVariant">
        {itemIds.map((i) => (
          <MenuItem i={i} key={i} />
        ))}
      </motion.ul>
    </motion.div>
  );
};

const itemIds = [0, 1, 2, 3];
