import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Success');
    /*try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };

      const user = {
        email,
        password,
      }

      const body = JSON.stringify(user);

      const res = await axios.post('/api/auth', body, config);

      console.log(res.data);

    } catch (err) {
      console.error(err);
    }*/
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Log In</h1>
        <p className="lead"><i className="fas fa-user"></i> Log In Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" required onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Log In" />
        </form>
        <p className="my-1">
          Don't have an account? <Link href="/Register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  )
}
