import Navbar from "@/component/shared/Navbar";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "100Vh" }}>
        
            {children}
        
      </Box>
    </>
  );
};

export default CommonLayout;
