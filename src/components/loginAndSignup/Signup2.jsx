import { useState, useEffect } from "react";
import "./userRegister.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import Header from "../header/Header";
import Menu from "../menuFooter/Menu";

const Signup2 = () => {
  const locataion = useLocation();
  const navigate = useNavigate();
  const [errorText, set_errorText] = useState("");
  const user_tyep = locataion.state;

  const [timer, set_timer] = useState({
    minute: 0,
    second: 0,
  });
  const { minute, second } = timer;
  const [data, set_data] = useState({
    category: "",
    email: "",
    code: "",
    nickname: "",
    password: "",
    password2: "",
    name: "",
    phone: "",
    address: "",
    sub_address: "",
    company_number: "",
    introduce: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    set_data({
      ...data,
      [name]: value,
    });
  }

  const SignUp = () => {
    if (!data.email) {
      alert("Please fill the email!");
      return;
    }
    if (!data.code) {
      alert("Please fill the code!");
      return;
    }
    if (user_tyep == "1") {
      if (!data.nickname) {
        alert("Please fill the nickname!");
        return;
      }
    }
    if (!data.password) {
      alert("Please fill the password!");
      return;
    }
    if (!data.password2) {
      alert("Please fill the confirm password!");
      return;
    }
    if (data.password != data.password2) {
      alert("Password do not match!");
      return;
    }
    if (data.password.length <= 7 || data.password2.length <= 7) {
      alert("Password must be at least 8 characters!");
      return;
    }

    if (user_tyep == "2") {
      if (!data.name) {
        alert("Please fill the store name!");
        return;
      }
      if (!data.address) {
        alert("Please fill the address!");
        return;
      }
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate("/loginuser");
        return;
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          // set_errorText(err.response.data.message);
          alert(err.response.data.message);
        } else {
          // set_errorText("This is an unknown error.");
          console.log("This is an unknown error.");
        }
      });
    console.log(data);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (second > 0) {
        set_timer({
          ...timer,
          second: second - 1,
        });
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(countdown);
        } else {
          set_timer({
            minute: minute - 1,
            second: 59,
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  return (
    <>
      <Header />
      <div className="box_forgot">
        <div className="box_back">
          <Link to="/signup1" className="box_iconBack">
            <MdArrowBack id="iconBack" />
          </Link>
        </div>

        {user_tyep == "1" ? (
          <h2>User registration</h2>
        ) : (
          <h2>Seller registration</h2>
        )}

        <div className="title">
          You are in the process of signing up as a user!
        </div>
        <form className="container_form_user">
          <div className="box_title">Enter basic information</div>
          <div className="container_form_user2">
            <input
              type="email"
              name="email"
              onChange={onChange}
              value={data.email}
              placeholder="Email"
              required
            />
            {minute > 0 || second > 0 ? (
              <div id="email_send_btn" className="verification">
                {minute < 10 ? `0${minute}` : minute}:
                {second < 10 ? `0${second}` : second}
              </div>
            ) : (
              <div
                onClick={() => {
                  if (data.email.length > 0) {
                    set_timer({ minute: 3, second: 0 });
                    let config = {
                      method: "post",
                      maxBodyLength: Infinity,
                      url: import.meta.env.VITE_API + "/user/send-email",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      data: data,
                    };

                    axios
                      .request(config)
                      .then((response) => {
                        console.log(JSON.stringify(response.data));
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    set_errorText("Please enter your e-mail.");
                  }
                }}
                id="email_send_btn"
                className="verification"
              >
                Verify
              </div>
            )}
          </div>
          <input
            type="text"
            name="code"
            onChange={onChange}
            value={data.code}
            placeholder="Certication Number"
            required
          />
          {user_tyep == "1" && (
            <input
              type="text"
              name="nickname"
              onChange={onChange}
              value={data.nickname}
              placeholder="Nickname (maximun 10 characters)"
              required
            />
          )}

          <input
            type="password"
            name="password"
            onChange={onChange}
            value={data.password}
            placeholder="passwords"
            required
          />
          <input
            type="password"
            name="password2"
            onChange={onChange}
            value={data.password2}
            placeholder="Confirm password"
            required
          />
          {user_tyep == "2" && (
            <>
              <div className="box_titles">Enter store information</div>
              <input
                type="text"
                name="category"
                placeholder="category"
                value={(data.category = "2")}
                onChange={onChange}
                required
                hidden
              />
              <input
                type="text"
                name="name"
                placeholder="Store name (required)"
                value={data.name}
                onChange={onChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address (required) "
                value={data.address}
                onChange={onChange}
                required
              />
              <input
                type="text"
                name="sub_address"
                placeholder="Detailed address (optional)"
                value={data.sub_address}
                onChange={onChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone number (optional)"
                value={data.phone}
                onChange={onChange}
              />
              <input
                type="text"
                name="company_number"
                placeholder="Business registration number (optional)"
                value={data.company_number}
                onChange={onChange}
              />

              <textarea
                className="box_text"
                name="introduce"
                placeholder="Store introduction (optional/maximum 300 characters)"
                maxLength="300"
                value={data.introduce}
                onChange={onChange}
              ></textarea>
            </>
          )}
          {/* {!passwordMatch && (
            <p className="error-text">Passwords do not match.</p>
          )} */}
          <button type="button" onClick={SignUp}>
            Register
          </button>
        </form>
        {/* {errorText.length > 0 && <div>{errorText}</div>} */}
      </div>
      <Menu />
    </>
  );
};

export default Signup2;
