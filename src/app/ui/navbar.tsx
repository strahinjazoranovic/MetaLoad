import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-10 mt-2">
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
}

export default Navbar;
