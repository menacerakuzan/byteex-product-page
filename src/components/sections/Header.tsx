import Link from "next/link";
import { LogoIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="container-page flex justify-center pt-[13px] lg:justify-start lg:pt-[33px]">
      <Link href="/" aria-label="Byteex — home" className="text-black">
        <LogoIcon className="h-[35px] w-[200px]" />
      </Link>
    </header>
  );
}
