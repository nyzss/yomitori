import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import ChapterList from "../../components/ChapterList";
// import {useRouter} from 'next/router'

export const getServerSideProps = async (context) => {
  const mangaId = "a96676e5-8ae2-425e-b549-7f15dd34a6d8";

  const res = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);

  const chapList = await axios.get(
    `https://api.mangadex.org/chapter?manga=${mangaId}&limit=100&translatedLanguage=en`
  );
  const chapList2 = await axios.get(
    `https://api.mangadex.org/chapter?manga=${mangaId}&limit=100&offset=100&translatedLanguage=en`
  );

  const getAuthorId = res.data.relationships.filter(
    (author) => author.type == "author"
  );

  const authorId = getAuthorId[0].id;

  const author = await axios.get(`https://api.mangadex.org/author/${authorId}`);

  const chapterList = chapList.data.results.concat(chapList2.data.results);

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
  console.log(mangaData);
  console.log(" ------ author id ------", author);
  //   console.log(chapterList);

  const mangaTitle = mangaData.data.attributes.title.en;
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
    <>
      <Head>
        <title>Yomitori | {mangaTitle}</title>
      </Head>
      <div className="box">
        <div className="container m-6">
          <div className="columns">
            <div className="column">
              <div className="box">
                <h1>
                  Manga Title: <span className="yomitori">{mangaTitle}</span>
                </h1>
                <p className="is-size-6 mt-1">id: {mangaId}</p>
                <hr />

                <div className="columns is-mobile">
                  <div className="column">
                    <h3 className="yomitori"> Description:</h3>
                    <p>{mangaDesc}</p>
                  </div>
                  <div className="column">
                    <p>
                      <span className="yomitori">Author:</span> {authorName}
                    </p>
                    <p>
                      <span className="yomitori">Type:</span> {mangaType}
                    </p>
                    <p>
                      <span className="yomitori">Status:</span> {mangaStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="box">
              <ChapterList id={mangaId} chapterList={chapterList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manga;
