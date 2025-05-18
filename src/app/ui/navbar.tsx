import Link from "next/link";


const Navbar = () => {
  return (
    <nav className="bg-white/10 z-1 fixed w-full backdrop-blur-lg border border-white/4 pl-0 pr-0 pt-3 pb-3">
      <div className="flex justify-around">
        <Link href="/">
          <button className="btn bg-black">Home</button>
        </Link>
        <Link href="/loads">
          <button className="btn bg-black">Loadouts</button>
        </Link>
        <Link href="/create">
          <button className="btn bg-black">Create Loadout</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
