import AddContact from "@/component/addContact/AddContact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Contact || Contact Management ",
};
const HomePage = () => {
  return (
   <>
   <AddContact/>
   </>
  );
};

export default HomePage;
