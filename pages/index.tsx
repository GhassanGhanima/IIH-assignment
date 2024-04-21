'use client'
import { useState } from "react";

import Main from "@/components/layout/main";
import SideBar from "@/components/layout/sideBar";

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false)

  const onMobileMenuClose = () => {
    setMobileMenu(false)
  }

  const onMobileMenuopen = () => {
    setMobileMenu(true)
  }
  
  return (
    <main className={`layout ${mobileMenu ? 'active-sideBar' : ''}`}>
      <SideBar onMobileMenuClose={onMobileMenuClose} />
      <Main onMobileMenuopen={onMobileMenuopen} />
    </main>
  );
}
