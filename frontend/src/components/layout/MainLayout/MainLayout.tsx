import { Outlet } from "react-router";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <>
    <Outlet />
    <Footer />
    </>
  )
}