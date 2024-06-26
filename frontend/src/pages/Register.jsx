// import { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account!</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Please enter your name</label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              autoComplete='name'
              placeholder='John Doe'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Please enter your email</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              autoComplete='email'
              placeholder='email@domain.com'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Please enter your password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              autoComplete='password'
              placeholder='Password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Please confirm your password</label>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-block'
            >
              Create Account
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
