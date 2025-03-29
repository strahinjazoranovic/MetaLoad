import Link from "next/link";


const Navbar = () => {
  return (
    <nav className="bg-white/10 z-1 fixed w-full backdrop-blur-lg border border-white/4 p-3">
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
