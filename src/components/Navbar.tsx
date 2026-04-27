import zionaWordmark from "@/assets/ziona-wordmark.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center h-16">
        <img src={zionaWordmark} alt="Ziona" className="h-8 md:h-10" />
      </div>
    </nav>
  );
};

export default Navbar;
