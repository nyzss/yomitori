import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";

const ChapterList = ({ id, chapterList }) => {
  //   console.log(chapterList);

  const [searchedManga, setSearchedManga] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (id) => {
    console.log(id);
  };

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
              placeholder="Search Chapter (By Chapter Number)"
            />
            {/* <h1>{ searchedManga }</h1> */}
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        {chapterList
          .filter((chapter) => {
            if (searchedManga == "") {
              return chapter;
            } else if (
              chapter.data.attributes.chapter &&
              chapter.data.attributes.chapter.includes(searchedManga)
            ) {
              return chapter;
            }
          })
          .map((chapter) => (
            <a className="panel-block is-active" key={chapter.data.id}>
              <Link href={`/manga/chapter/${chapter.data.id}`}>
                <div className="is-size-5">
                  <span className="panel-icon">
                    <i className="fas fa-book" aria-hidden="true"></i>
                  </span>
                  {chapter.data.attributes.chapter} -{" "}
                  {chapter.data.attributes.title}
                </div>
              </Link>
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
