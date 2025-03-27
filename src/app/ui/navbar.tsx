import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white/10 fixed w-full z-1 backdrop-blur-lg border border-white/4 max-w p-4">
      <div className="flex justify-around">
        <Link href="/">
          <button className="btn btn bg-black">Home</button>
        </Link>
        <Link href="/loads">
          <button className="btn btn bg-black">Loadouts</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
