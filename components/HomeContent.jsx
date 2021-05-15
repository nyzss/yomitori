const HomeContent = () => {
  return (
    <>
      <div className="home">
        <div className="box">
          <h1 className="title">yomitori</h1>
          <div className="card">
            <div className="card-content">
              <div className="content">
                This website was purely made for learning purposes using the
                <a href="https://api.mangadex.org/"> Mangadex API</a>
                <p className="is-size-7">
                  With <a href="https://nextjs.org/">Next.js</a> |{" "}
                  <a href="https://bulma.io/">Bulma</a> - by{" "}
                  <a href="https://github.com/nyzss">
                    nyzs <i className="fab fa-github is-danger"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
