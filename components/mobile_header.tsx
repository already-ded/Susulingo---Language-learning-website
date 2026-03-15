import { MobileSidebar } from "./mobile_sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden fixed top-0  w-full z-50 flex h-[50px] items-center border-b bg-green-500 px-6">
     <MobileSidebar/>
    </nav>
  );
};