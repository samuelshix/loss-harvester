import WalletMultiButton from "./WalletMultiButton";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/navbar";
import { Tooltip } from "@nextui-org/tooltip";
// import Image from "next/image";
// import SolanaLogo from "../public/solanaLogo.svg";

export function NavBar() {
    return (
        <Navbar>
            <NavbarBrand>
                {/* <Image src={SolanaLogo} alt="Solana Logo" width={100} /> */}
            </NavbarBrand>
            <NavbarContent justify="end">
                <Tooltip content="Devnet Only">
                    <NavbarItem>
                        <div className="m-5">
                            <WalletMultiButton />
                        </div>
                    </NavbarItem>
                </Tooltip>
            </NavbarContent>
        </Navbar>
    );
}