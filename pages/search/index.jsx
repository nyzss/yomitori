import { useEffect } from "react";
import { useRouter } from "next/router";

const SearchPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div>
      <h1>lemao</h1>
    </div>
  );
};

export default SearchPage;

{
  /* redirecting const [searchManga, setSearchManga] = useState(""); return (
<div className="mx-auto mt-6 m-4">
  <div className="block">
    <div className="container">
      <div className="box">
        <h1>Search manga..</h1>
        <input
          className="input is-danger my-5"
          type="text"
          placeholder="Search.."
          value={searchManga}
          onChange={(e) => setSearchManga(e.target.value)}
        />
        <h1>{searchManga}</h1>
      </div>
    </div>
  </div>
</div> */
}
