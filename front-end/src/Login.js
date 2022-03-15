import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
  }
  Post(refs) {
    axios
      .post("http://localhost:3016/login/admin", {
        email: refs.username.value,
        password: refs.password.value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    if (this.state.login === true) {
      return <Redirect to="/" />;
    }

    return (
      <section>
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                ref="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                ref="password"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <input
              type="button"
              onClick={() => this.Post(this.refs)}
              value="Login now"
              className="btn btn-primary btn-style mt-4"
            />
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
