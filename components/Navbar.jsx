import Head from "next/head";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [searchManga, setSearchManga] = useState("");
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push(`/search/${searchManga}`);
    }
  };

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
          </div>
          <div className="navbar-end">
            <Link className="p-3" href={`/search/${searchManga}`}>
              <a className="navbar-item">Search</a>
            </Link>
            <p className="control has-icons-left m-4">
              <input
                className="input is-danger"
                type="text"
                value={searchManga}
                onChange={(e) => setSearchManga(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search Manga.."
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
