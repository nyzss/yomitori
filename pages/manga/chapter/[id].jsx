import axios from "axios";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  const chapterId = context.params.id;

  const chapterServer = await axios.get(
    `https://api.mangadex.org/at-home/server/${chapterId}`
  );

  const chapterData = await axios.get(
    `https://api.mangadex.org/chapter/${chapterId}`
  );

  return {
    props: {
      chapterId: chapterId,
      chapterServer: chapterServer.data.baseUrl,
      chapterData: chapterData.data,
    },
  };
};

const ChapterPage = ({ chapterId, chapterServer, chapterData }) => {
  // console.log(chapterId);
  // console.log(chapterServer);
  console.log(chapterData);

  const chapterTitle = chapterData.data.attributes.title;
  const chapterNumber = chapterData.data.attributes.chapter;
  const chapterHash = chapterData.data.attributes.hash;
  const chapterVolume = chapterData.data.attributes.volume;
  const chapterImages = chapterData.data.attributes.dataSaver;

  // const chapterPage = `${chapterServer}/data-saver/${chapterHash}/${forEachOfThePageName}`;
  console.log();

  return (
    <div className="mx-atuo">
      <div className="block">
        <div className="container">
          {/* <div className="box"> */}
          <div className="column">
            <div className="box">
              <h1 className="is-size-3 has-text-weight-bold">
                <span className="yomitori">Chapter Title:</span> {chapterTitle}
              </h1>
              <h2 className="is-size-4">
                Chapter: <span className="yomitori mt-5">{chapterNumber}</span>
              </h2>
              <h2 className="is-size-4">
                Volume: <span className="yomitori mt-5">{chapterVolume}</span>
              </h2>
              <h2 className="is-size-6">chapter id: {chapterId}</h2>
            </div>
            <div className="box is-centered has-text-centered">
              {chapterImages.map((chapter) => (
                <img
                  key={chapter}
                  src={`${chapterServer}/data-saver/${chapterHash}/${chapter}`}
                  alt={`chapter image - ${chapter}`}
                />
              ))}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
