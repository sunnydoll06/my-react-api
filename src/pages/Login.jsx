import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_POST_DATA } from "../components/Constants";

function Login() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const defaultAccount = "hamaadm33";
  const defaultPassword = "hamaadm33";

  async function postData({ account, password }) {
    try {
      const response = await fetch(API_POST_DATA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain:"localhost:8080", account, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const accessToken = data.body.access_token;
        const userName = data.body.name;
        console.log(accessToken);
        if (accessToken) {
          setToken(accessToken);
          localStorage.setItem("token", accessToken);
          localStorage.setItem("userName", userName);
          setErrorMessage("");
          navigate("/table");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "登入失敗, 請檢查帳號密碼");
      }
    } catch (error) {
      setErrorMessage("登入失敗, 請稍後再試");
    }
  };

  const [account, setAccount] = useState(defaultAccount);
  const [password, setPassword] = useState(defaultPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    postData({ account, password });
    setAccount("");
    setPassword("");
  };

  return (
    <>
      <form className="block" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>使用者名稱</p>
        <input
          type="text"
          value={account}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        />
        <p>密碼</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">登入</button>
      </form>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </>
  );
}

export default Login;
