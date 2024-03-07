import Image from "next/image";
import { Nav } from "@/app/(Components)/Nav";

import Login from "./LoginPage/page";

import dotenv from "dotenv";

dotenv.config();
export default function Home() {
  return (
    <>
      <Login />
    </>
  );
}
