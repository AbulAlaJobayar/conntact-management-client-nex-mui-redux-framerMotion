import ALLContact from "@/component/allContact/AllContact";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "All Contact || Contact Management ",
};
const ContactPage = () => {
 
  return (
    <>
      <ALLContact />
    </>
  );
};

export default ContactPage;
