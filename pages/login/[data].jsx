import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps = async (context) => {
  const userData = context.params.data;
  const decoded = atob(userData);
  const getIndexOf = decoded.indexOf("<");

  const username = decoded.substring(0, getIndexOf);
  const password = decoded.substring(getIndexOf + 1);

  const res = await axios({
    method: "post",
    url: "https://api.mangadex.org/auth/login",
    data: {
      username: username,
      password: password,
    },
    header: {
      "Content-Type": "application/json",
    },
  });

  const token = res.data.token.session;

  return {
    props: {
      token: token,
    },
  };
};

const UserData = ({ token }) => {
  const router = useRouter();

  console.log(token);

  useEffect(() => {
    router.push(`/manga-list/${token}`);

    //   setTimeout(() => {
    //   }, 1000);
  }, []);

  const handleClick = () => {
    router.push(`/manga-list/${token}`);
  };

  return (
    <>
      <Head>
        <title>Yomitori | Loading...</title>
      </Head>
      <div className="container m-6">
        <div className="column is-4 is-offset-5 mt-6">
          <div className="block my-6">
            <div className="has-text-centered mx-0 my-6">
              <div className="box">
                <div className="block">
                  <h1>Loading...</h1>
                  <div className="lds-circle my-6">
                    <div></div>
                    <h3 className="is-size-5">
                      If you're not automatically redirected
                    </h3>
                    <button className="button is-danger" onClick={handleClick}>
                      Click here!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
