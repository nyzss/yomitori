import Head from "next/head";
import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const searchedTitle = context.params.title;

  const searchedData = await axios.get(
    `https://api.mangadex.org/manga?limit=100&title=${searchedTitle}`
  );

  return {
    props: {
      searchedTitle: searchedTitle,
      searchedData: searchedData.data.results,
    },
  };
};

const SearchedMangaTitle = ({ searchedTitle, searchedData }) => {
  // console.log(searchedTitle);
  // console.log(searchedData);

  return (
    <>
      <Head>
        <title>Yomitori | {searchedTitle}</title>
      </Head>
      <div className="mx-auto my-6 m-4">
        <div className="container">
          <div className="block">
            <div className="box">
              <p className="card-header-title">You searched: {searchedTitle}</p>
              {searchedData.map((manga) => (
                <div className="card" key={manga.data.id}>
                  <header className="card-header"></header>
                  <div className="m-6">
                    <div className="card-content m-6">
                      <div className="content">
                        <h4 className="is-size-3">
                          <span className="yomitori">
                            {manga.data.attributes.title.en}
                          </span>
                        </h4>
                        <p className="is-size-5">
                          {manga.data.attributes.description.en.substring(
                            0,
                            250
                          )}
                          ....
                        </p>
                        <h4>
                          <span className="yomitori">Status:</span>{" "}
                          {manga.data.attributes.status}
                        </h4>
                        <div className="tags is-size-5">
                          <h3>tags:</h3>
                          {manga.data.attributes.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="tag is-danger is-light mx-3 is-size-6"
                            >
                              {tag.attributes.name.en}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <footer className="card-footer">
                      <Link
                        href={`/manga/${manga.data.id}`}
                        className="card-footer-item has-text-centered"
                      >
                        {/* <p className="has-text-weight-bold yomitori is-size-5 text-center"> */}
                        <button className="button is-danger m-4">
                          Read {manga.data.attributes.title.en}
                        </button>
                        {/* </p> */}
                      </Link>
                    </footer>
                    <hr />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedMangaTitle;
