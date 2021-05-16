import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import ChapterList from "../../components/ChapterList";
// import {useRouter} from 'next/router'

export const getServerSideProps = async (context) => {
  //   const mangaId = "a96676e5-8ae2-425e-b549-7f15dd34a6d8";
  const mangaId = context.params.id;

  const res = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);

  const chapList = await axios.get(
    `https://api.mangadex.org/chapter?manga=${mangaId}&limit=100&translatedLanguage=en`
  );

  let chapterList = chapList.data.results;

  if (chapterList) {
    if (chapterList.length > 99) {
      const chapList2 = await axios.get(
        `https://api.mangadex.org/chapter?manga=${mangaId}&limit=100&offset=100&translatedLanguage=en`
      );
      chapterList = chapList.data.results.concat(chapList2.data.results);
    }
  }

  const getAuthorId = res.data.relationships.filter(
    (author) => author.type == "author"
  );

  const authorId = getAuthorId[0].id;

  const author = await axios.get(`https://api.mangadex.org/author/${authorId}`);

  //   const chapterList = chapList.data.results.concat(chapList2.data.results);

  return {
    props: {
      mangaData: res.data,
      chapterList: chapterList,
      // authorId: authorId,
      author: author.data,
    },
  };
};

const Manga = ({ mangaData, chapterList, author }) => {
  //   console.log(mangaData);
  //   console.log(" ------ author id ------", author);
  console.log("chaplist ------------", chapterList);

  let mangaTitle = "";

  if (mangaData.data.attributes.title.en) {
    mangaTitle = mangaData.data.attributes.title.en;
  } else {
    mangaTitle = mangaData.data.attributes.title;
  }

  const mangaType = mangaData.data.type;
  const [mangaDesc, setMangaDesc] = useState(
    mangaData.data.attributes.description.en
  );

  const authorName = author.data.attributes.name;

  const mangaStatus = mangaData.data.attributes.status;
  const mangaId = mangaData.data.id;

  if (mangaDesc.includes("[")) {
    const getMangaDesc = mangaDesc.indexOf("[");
    setMangaDesc(mangaDesc.substring(0, getMangaDesc));
  }

  return (
    <div className="mx-auto">
      <Head>
        <title>Yomitori | {mangaTitle}</title>
      </Head>
      <div className="mx-auto">
        <div className="block m-4">
          <div className="container m-4">
            <div className="box">
              <div className="columns is-three-quarters">
                <div className="column">
                  <div className="box">
                    <h1>
                      Manga Title:{" "}
                      <span className="yomitori">{mangaTitle}</span>
                    </h1>
                    <p className="is-size-6 mt-1">id: {mangaId}</p>
                    <hr />

                    <div className="columns ">
                      <div className="column">
                        <h3 className="yomitori"> Description:</h3>
                        <p className="is-size-5">{mangaDesc}</p>
                      </div>
                      <div className="column is-desktop">
                        <p className="is-size-4">
                          <span className="yomitori">Author:</span> {authorName}
                        </p>
                        <p className="is-size-4">
                          <span className="yomitori">Type:</span> {mangaType}
                        </p>
                        <p className="is-size-4">
                          <span className="yomitori">Status:</span>{" "}
                          {mangaStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="box m-4 mx-auto">
                <ChapterList id={mangaId} chapterList={chapterList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manga;
