import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const token = context.params.token;

  // const router = useRouter();

  const getUserData = await axios({
    method: "GET",
    url: "https://api.mangadex.org/user/me",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.log(err);
    // router.push("/");
  });

  const getUserReadList = await axios({
    method: "GET",
    url: "https://api.mangadex.org/user/follows/manga?limit=100",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.log(err);
    // router.push("/");
  });

  return {
    props: {
      token: token,
      userData: getUserData.data.data,
      readList: getUserReadList.data.results,
    },
  };
};

const RenderReadList = ({ token, userData, readList }) => {
  // console.log(userData);
  console.log(readList);
  const username = userData.attributes.username;
  const userId = userData.id;

  return (
    <>
      <Head>
        <title>Yomitori | {username}</title>
      </Head>
      <div className="container my-6">
        <div className="column is-8 is-offset-2">
          <div className="block">
            <div className="box">
              <div className="box">
                <div>
                  <h1 className="is-size-4">
                    Welcome <span className="yomitori">{username}</span>!
                  </h1>
                  <p className="is-size-6">
                    <span className="yomitori">user id:</span> {userId}
                  </p>
                </div>
              </div>
              {readList.map((manga) => (
                <div className="box" key={manga.data.id}>
                  <div className="card">
                    <div className="card-image"></div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left"></div>
                        <div className="media-content">
                          <p className="title is-4">
                            Title:
                            <span className="yomitori">
                              {" "}
                              {manga.data.attributes.title.en}{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="content is-size-5">
                        <p className="has-text-weight-bold">Description: </p>
                        {manga.data.attributes.description.en.substring(0, 230)}
                        ...
                        <br />
                        <div className="card p-0">
                          <div className="tags is-size-6 my-3">
                            <h3 className="is-size-5"></h3>
                            {manga.data.attributes.tags.map((tag) => (
                              <span
                                key={tag.id}
                                className="tag is-danger is-light mx-3 my-2 is-size-6"
                              >
                                {tag.attributes.name.en}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="has-text-centered">
                          <Link
                            href={`/manga/${manga.data.id}`}
                            className="button is-danger mx-auto"
                          >
                            <div>
                              <button className="button is-danger">
                                Read {manga.data.attributes.title.en}
                              </button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default RenderReadList;
