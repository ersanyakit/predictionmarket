import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Image,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import ConnectButton from "./ConnectButton";

export default function Header2() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = (path: string) => {
    setIsMenuOpen(false); // Menüyü kapat
    router.replace(path); // Sayfayı değiştir
  };

  return (
    <Navbar
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      className={`h-24 fixed z-[10]`}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:flex md:hidden"
        />
        <NavbarBrand className="flex gap-2">
          <Link href="/">
          PREDICTION MARKET
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="flex sm:hidden gap-4 text-white"
        justify="center"
      >
        
        <NavbarItem>
          <Button
            onClick={() => router.push("/profile")}
            className={
              router.asPath === "/profile"
                ? "text-2xl bg-transparent text-primary-300"
                : "text-2xl bg-transparent text-white"
            }
          >
            Profile
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-[#09092b] flex flex-col justify-between pb-20 z-[99999]">
        <NavbarMenuItem className="pt-10 flex flex-col gap-10">
          
          
          <Button
            className="w-full text-white bg-transparent justify-start text-3xl"
            onClick={() => handleMenuClick("/profile")}
          >
            Profile
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
