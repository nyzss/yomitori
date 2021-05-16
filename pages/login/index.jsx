import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  //   let user = {};
  const handleSubmit = (e) => {
    e.preventDefault();

    const encoded = btoa(`${username}<${password}`);

    router.push(`/login/${encoded}`);

    // axios({
    //   method: "post",
    //   url: "https://api.mangadex.org/auth/login",
    //   data: {
    //     username: username,
    //     password: password,
    //   },
    //   header: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => {
    //   // console.log(res.data.token.session);
    //   const token = res.data.token.session;
    //   router.push(`/manga-list/${token}`);
    // });
  };

  return (
    <>
      <Head>
        <title>Yomitori | Login</title>
      </Head>
      <div className="container has-text-centered">
        <div className="column is-half is-offset-one-quarter p-6">
          <div className="block">
            <div className="box p-6">
              <img src="./128x.png" alt="yomitori logo" />
              <h1 className="is-size-4 mb-6 my-3">Yomitori</h1>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-bolt"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-danger">Login</button>
                  </p>
                </div>
                <h4 className="is-size-6 my-3 mt-5">
                  Don't forget that you have to use your
                  <span className="yomitori"> Mangadex</span> account!
                </h4>
              </form>
            </div>
            <h4 className="is-size-7 my-3 mt-5 mx-6">
              Your password is <span className="yomitori">not </span>
              stored, the source of yomitori will be available on github soon..
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
