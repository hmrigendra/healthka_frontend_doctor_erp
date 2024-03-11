import Login from "./LoginPage/page";

import dotenv from "dotenv";
import { SkeletonTheme } from "react-loading-skeleton";
import { Modal } from "./(Components)/Modal";

dotenv.config();
export default function Home() {
  return (
    <>
      <SkeletonTheme baseColor="##ff0000" highlightColor="#525252">
        <Login />
      </SkeletonTheme>
    </>
  );
}
