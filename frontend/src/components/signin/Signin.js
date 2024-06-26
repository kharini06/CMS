import React from "react";
import { useForm } from "react-hook-form";
import { userLoginThunk } from "../../redux/slices/userLoginSlice";
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"   
import "./Signin.css";

function Signin() {
  let { register, handleSubmit } = useForm();
  let dispatch=useDispatch();
  let navigate=useNavigate()
  const {isPending,currentUser,errorStatus,errorMessage,loginStatus}=useSelector(state=>state.userLogin)

  function onSignUpFormSubmit(userCred) {
      let actionObj=userLoginThunk(userCred)
      dispatch(actionObj)
  }

  useEffect(()=>{
    if(loginStatus===true){
      if(currentUser.userType==='user'){
      navigate('/user-profile')
      }
      if(currentUser.userType==='writer'){
        navigate('/author-profile')
        }
    }
  },[loginStatus])

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signin</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                  >
                    Login as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType")}
                    />
                    <label
                      htmlFor="author"
                      className="form-check-label"
                    >
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label
                      htmlFor="user"
                      className="form-check-label"
                    >
                      User
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password")}
                  />
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="text-light"
                    style={{ backgroundColor: "grey" }} /* Changed to grey */
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
