import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from '@nextui-org/react';

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          CrowdFund
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
