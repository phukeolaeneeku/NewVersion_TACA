import React, { useState, useEffect } from "react";
import "./admins.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import AdminMenu from "../adminMenu/AdminMenu";
import { Link, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import user from "../../../img/user.png";
import profile from "../../../img/profile.jpg";
import axios from "axios";

const Admins = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [admins, set_admins] = useState([]);
  const [id, set_id] = useState("");
  console.log(id);

  useEffect(() => {
    let data = JSON.stringify({
      token: token,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/check-token",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.result != "success") {
          localStorage.clear();

          navigate("/loginuser");
          return;
        }
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
        navigate("/loginuser");
        return;
      });
  }, [token]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/admin-users",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_admins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [admins]);

  
  const handleDelete = () => {
    let data = "";

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/user/admin-users/${id}`,
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert("Admin user has been deleted.");
        set_id("");
        setShowConfirmation(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(admins);


  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    
  };

  return (
    <>
      <section id="menager">
        <AdminMenu />
        <div className="container_body_adminuser">
          <div className="container_box_users">
            <div className="box_users">
              <div className="box_add_admin">
                <Link to="/add-admin" className="btn_addadmin">
                  <BiPlus id="icon_add_admin" />
                  Add Admin
                </Link>
              </div>

              {/* <form className="search">
                <div className="search-box_menageruser">
                  <input type="text" placeholder="Search ..." />
                  <button type="submit">
                    <IoSearchOutline />
                  </button>
                </div>
              </form> */}
            </div>

            {admins.length === 0 ? (
              <p className="no-reviews-message">No Order</p>
            ) : (
              admins.map((user, index) => (
                <div key={user.id} className="box_users_user">
                  <div className="box_dp_txtandiamge">
                    <div className="box_user_img">
                      <img src={user.profile_image || profile} alt="" />
                    </div>
                    <div className="box_user_text">
                      <p>{user.nickname}</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="btn_box_Cont">
                    <button
                      className="delete_storeDetails"
                      onClick={() => {
                        setShowConfirmation(true)
                        set_id(user.id);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit-admin/${user.id}`}
                      className="viewMore_storeDetails"
                    >
                      View
                    </Link>
                  </div>
                  {showConfirmation && (
                    <div className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <div className="box_logout">
                          <p>Are you sure you want to delete</p>
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={handleCancelDelete}
                          >
                            No
                          </button>
                          <button
                            className="btn_confirm btn_addproducttxt_popup"
                            onClick={() => {
                              handleDelete();
                            }}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Admins;