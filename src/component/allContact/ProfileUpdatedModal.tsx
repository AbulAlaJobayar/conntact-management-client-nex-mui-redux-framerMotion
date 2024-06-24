"use client";

import React from "react";
import { FieldValues } from "react-hook-form";

import { toast } from "sonner";

import BBModal from "../Form/BBModal";
import BBForm from "../Form/BBForm";
import { Button, Grid } from "@mui/material";
import BBInput from "../Form/BBInput";
import {
  useEditContactMutation,
  useGetSingleContactQuery,
} from "@/redux/services/baseApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: singleContact, isLoading } = useGetSingleContactQuery(id);

  const [editContact] = useEditContactMutation();
  const submitHandler = async (values: FieldValues) => {
    const items = { ...values };
    const data = {
      id: id,
      status: items,
    };
    try {
      const res = await editContact(data);
      if (res) {
        toast.success("Contact Updated Successfully");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <>loading...........</>;
  }
  return (
    <BBModal open={open} setOpen={setOpen} title="Update Profile">
      <BBForm
        onSubmit={submitHandler}
        defaultValues={{
          name: singleContact?.data?.name,
          email: singleContact?.data.email || "",
          phoneNumber: singleContact?.data.phoneNumber || "",
          address: singleContact?.data.address || "",
        }}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={6}>
            <BBInput name="name" label="Name" sx={{ mb: 2 }} fullWidth />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <BBInput name="email" label="Email" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <BBInput
              name="phoneNumber"
              label="Phone Number"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <BBInput name="address" label="Address" sx={{ mb: 2 }} fullWidth />
          </Grid>
        </Grid>

        <Button fullWidth type="submit">
          Save
        </Button>
      </BBForm>
    </BBModal>
  );
};

export default ProfileUpdateModal;
