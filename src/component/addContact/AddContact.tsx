"use client";
import BBForm from "@/component/Form/BBForm";
import BBInput from "@/component/Form/BBInput";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { toast } from "sonner";
import { register } from "@/services/action/register";

// import { registerValidationSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageHosting } from "@/utils/imageHosting";
import BBImage from "../Form/BBImage";

interface IFormInput {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  bio: string;
  photoUrl: any;
}
const registerValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  photoUrl: "",
};

const AddContact = () => {
  const handleRegister = async (data: IFormInput) => {
    const toastId = toast.loading("Creating Contact", {
      position: "top-center",
      style: {
        color: "#8ed1a3",
      },
      duration: 2000,
    });
    try {
      const imageUrl = await imageHosting(data.photoUrl);
      console.log("hello");
      const res = await register({ ...data, photoUrl: imageUrl });
      console.log("res", res);
      if (res?.data?._id) {
        toast.success("Created Contact", {
          id: toastId,
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <Box>
      <Box bgcolor={"#f5f5f5"}>
        <Container>
          <Box py={10}>
            <Typography variant="h4" fontWeight={700}>
              Add Your Contact Info
            </Typography>
            <Typography fontWeight={400}>
              Share your contact info to avail all the features.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container>
        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box sx={{ flex: 1, my: 4 }}>
            <Typography variant="h6" fontWeight={700}>
              Add Contact
            </Typography>

            <Box>
              <BBForm
                onSubmit={handleRegister}
                // resolver={zodResolver(registerValidationSchema)}
                defaultValues={registerValues}
              >
                <Grid container spacing={3} my={1}>
                  <Grid item md={6}>
                    <BBInput
                      required
                      name="name"
                      type="text"
                      fullWidth
                      label="Name"
                      size="small"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <BBInput
                      name="email"
                      fullWidth
                      label="Email"
                      size="small"
                      type="text"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <BBInput
                      required
                      name="phoneNumber"
                      fullWidth
                      label="Phone Number"
                      size="small"
                      type="text"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <BBInput
                      required
                      name="address"
                      fullWidth
                      label="Address"
                      size="small"
                      type="text"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <BBImage
                      required
                      name="photoUrl"
                      fullWidth
                      size="small"
                      type="file"
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    margin: "10px 0px",
                  }}
                >
                  Register
                </Button>
              </BBForm>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AddContact;
