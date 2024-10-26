import Image from "next/image";
import Signin from "@/app/(login)/sign-in/page";
export const business_unit_options = ["Cardiac Surgery", "Cardiology", "Diagnostics", "Endosurgery", "ENT", "Marketing Activities", "Meril Sports Medicine", "Orthopedics", "Peripheral", "Trauma BU"];
export const budget_options = ["National", "Regional", "Government"];
export default function Home() {
  return (
   <Signin/>
  );
}
