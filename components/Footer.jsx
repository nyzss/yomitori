const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <h4 className="is-size-6">
          This website was purely made for learning purposes using the
          <a href="https://api.mangadex.org/"> Mangadex API</a>
          <p className="is-size-7">
            With <a href="https://nextjs.org/">Next.js</a> |
            <a href="https://bulma.io/"> Bulma</a> - by
            <a href="https://github.com/nyzss">
              {" "}
              nyzs <i className="fab fa-github is-danger"></i>
            </a>
          </p>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
