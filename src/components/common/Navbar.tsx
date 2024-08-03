import {
  Navbar as NextUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Badge,
  Input,
} from "@nextui-org/react";
import { FC, useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProfileOptions from "../profile/ProfileOptions";
import DarkModeSwitch from "./DarkModeSwitch";
import useCart from "../../hooks/useCart";
import { IoMdSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import MobileNav from "../MobileNav";
import useAuth from "../../hooks/useAuth";

interface Props {}

const Navbar: FC<Props> = () => {
  const [showNav, setShowNav] = useState(false);
  const { totalCount } = useCart();
  const { profile, signOut } = useAuth();
  const isAuthor = profile?.role === "author";

  const openNav = () => {
    setShowNav(true);
  };

  const closeNav = () => {
    setShowNav(false);
  };

  return (
    <>
      <NextUINav>
        <NavbarBrand className="md:flex hidden">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <FaBookReader size={24} />
            <p className="font-bold text-inherit">Store</p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="w-full" justify="center">
          <Input
            variant="bordered"
            placeholder="Search your book..."
            endContent={
              <button className="focus:outline-none" type="button">
                <IoMdSearch size={24} />
              </button>
            }
            className="w-full"
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="md:flex hidden">
            <DarkModeSwitch />
          </NavbarItem>
          <NavbarItem className="md:flex hidden">
            <Link to="/cart">
              <Badge content={totalCount} color="danger" shape="circle">
                <FaCartShopping size={24} />
              </Badge>
            </Link>
          </NavbarItem>
          <NavbarItem className="md:flex hidden">
            <ProfileOptions />
          </NavbarItem>

          <NavbarItem
            onClick={openNav}
            className="flex md:hidden cursor-pointer"
          >
            <IoMenu size={26} />
          </NavbarItem>
        </NavbarContent>
      </NextUINav>

      <MobileNav
        isAuthor={isAuthor}
        visible={showNav}
        onClose={closeNav}
        cartTotal={totalCount}
        onLogout={signOut}
      />
    </>
  );
};

export default Navbar;
