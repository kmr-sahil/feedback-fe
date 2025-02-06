import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen max-w-[64rem] mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
