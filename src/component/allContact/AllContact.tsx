"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import {
  useDelateContactMutation,
  useEditContactMutation,
  useGetAllContactQuery,
} from "@/redux/services/baseApi";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Swal from "sweetalert2";
import { toast } from "sonner";
import ProfileUpdateModal from "./ProfileUpdatedModal";
import { useState } from "react";
const ALLContact = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { data, isLoading } = useGetAllContactQuery("");
  console.log(data);
  const [deleteContact] = useDelateContactMutation();
  const [updateContact] = useEditContactMutation();
  if (isLoading) {
    return (
      <>
        <Container>
          <Grid container spacing={2} my={10}>
            {Array.from(new Array(10)).map((item, index) => (
              <Grid key={index} item xs={12} md={4}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    );
  }

  const handleDelete = async ({ id }: { id: string }) => {
    console.log(id);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        if (result.isConfirmed) {
          const res = await deleteContact(id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFavorite = async (id: string, status: any) => {
    const data = {
      id: id,
      status: status,
    };

    try {
      const res = await updateContact(data).unwrap();
      console.log(res);
      if (res?.data?._id) {
        toast.success("Favorite", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {}
  };

  const handleModalOpen = (id: string) => {
    setId(id);
    setOpen(true);
  };

  return (
    <Box>
      <Box bgcolor={"#f5f5f5"}>
        <Container>
          <Box py={10}>
            <Typography variant="h4" fontWeight={700}>
              All Contact Info
            </Typography>
            <Typography fontWeight={400}>
              Show All contact info to avail all the features.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box my={5}>
        <Container>
          <Grid container spacing={2}>
            {!isLoading &&
              data?.data.map((info: any) => (
                <Grid key={info.id} item xs={12} md={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Stack spacing={2} direction={"row"}>
                        <Box sx={{ flex: 1 }}>
                          <Image
                            src={info?.photoUrl}
                            alt={info.name}
                            width={500}
                            height={500}
                          />
                        </Box>
                        <Box>
                          <Typography>
                            Name:
                            <Box
                              component={"span"}
                              ml={1}
                              fontWeight={600}
                              sx={{ textTransform: "capitalize" }}
                            >
                              {info?.name}
                            </Box>{" "}
                          </Typography>
                          <Typography>
                            Email:{" "}
                            <Box
                              component={"span"}
                              ml={1}
                              fontWeight={600}
                              sx={{ textTransform: "capitalize" }}
                            >
                              {info?.email}
                            </Box>{" "}
                          </Typography>
                          <Typography>
                            Phone Number:{" "}
                            <Box
                              component={"span"}
                              ml={1}
                              sx={{ textTransform: "capitalize" }}
                              fontWeight={600}
                            >
                              {info?.phoneNumber}
                            </Box>{" "}
                          </Typography>
                          <Typography>
                            Address:{" "}
                            <Box
                              component={"span"}
                              ml={1}
                              sx={{ textTransform: "capitalize" }}
                              fontWeight={600}
                            >
                              {info?.address}
                            </Box>{" "}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button
                        startIcon={<EditIcon />}
                        variant="outlined"
                        onClick={() => handleModalOpen(info._id)}
                      >
                        update
                      </Button>
                      <Button
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete({ id: info._id })}
                      >
                        Delete
                      </Button>
                      <Button
                        variant={
                          info.favorite === "YES" ? "contained" : "outlined"
                        }
                        endIcon={<StarBorderIcon />}
                        onClick={() =>
                          handleFavorite(info._id, { favorite: "YES" })
                        }
                      >
                        Favorite
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <ProfileUpdateModal open={open} setOpen={setOpen} id={id} />
        </Container>
        <Box mt={4} display="flex" justifyContent="center"></Box>
      </Box>
    </Box>
  );
};

export default ALLContact;
