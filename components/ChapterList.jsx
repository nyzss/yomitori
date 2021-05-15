import axios from "axios";
import { useState } from "react";

const ChapterList = ({ id, chapterList }) => {
  //   console.log(chapterList);

  const [searchedManga, setSearchedManga] = useState("");

  
  // let filteredChapterList = []
 
  // if (searchedManga) {
  //   // filteredChapterList  = chapterList.filter(chapter => chapter.data.attributes.chapter === searchedManga)
  //   filteredChapterList  = chapterList.filter(chapter => chapter.data.attributes.chapter.includes(searchedManga))
  // }

  return (
    <div>
      <article className="panel is-danger">
        <p className="panel-heading">Chapters</p>
        <p className="panel-tabs">
          <a className="is-active">Chapter</a>
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-danger"
              type="text"
              value={searchedManga}
              onChange={(e) => setSearchedManga(e.target.value)}
              placeholder="Search Chapter"
            />
            {/* <h1>{ searchedManga }</h1> */}
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        {chapterList.filter(chapter => {
          if (searchedManga == "") {
            return chapter
          } else if (chapter.data.attributes.chapter  && chapter.data.attributes.chapter.includes(searchedManga)) {
            return chapter
          }
        }).map((chapter) => (
          <a className="panel-block is-active" key={chapter.data.id}>
            <span className="panel-icon">
              <i className="fas fa-book" aria-hidden="true"></i>
            </span>
            {chapter.data.attributes.chapter} - {chapter.data.attributes.title}
          </a>
        ))}
        {/* <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          marksheet
        </a> */}
      </article>
    </div>
  );
};

export default ChapterList;
