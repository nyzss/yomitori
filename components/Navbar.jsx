import Head from "next/head";
import Image from "next/dist/client/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar is-danger"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link href="/" className="navbar-item">
            <h1 className="title m-4 is-clickable">yomitori</h1>
          </Link>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item">Home</a>
            </Link>
            <Link href="/manga/a96676e5-8ae2-425e-b549-7f15dd34a6d8">
              <a className="navbar-item">Manga</a>
            </Link>

            <a className="navbar-item">Search</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
