"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const pages = [
  {
    href: "/",
    text: "Add Contacts",
  },
  {
    href: "/allContacts",
    text: "All Contacts",
  },
];
const Navbar = () => {
  const path = usePathname();
  console.log(path);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack 
            direction={"row"}
            justifyContent={"center"}
            gap={4}
            mx={"auto"}
          >
            {pages.map((page, i) => (
              <Link href={page.href} key={i}>
               <Box
                  component={motion.span}
                  whileHover={{ scale: 1.1 }}
                  sx={{

                    textDecoration: "none",
                    fontWeight: page.href === path ? "bold" : "normal",
                  }}
                >
                  {page.text}
                </Box>
              </Link>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
