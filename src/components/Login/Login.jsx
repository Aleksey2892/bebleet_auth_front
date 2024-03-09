import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { axiosInstance } from '../../api/axiosSettings'
import { toast, Bounce } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useAuth } from '../AuthProvider/AuthProvider'

function Register(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const { setToken } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async userData => {
    try {
      const { data } = await axiosInstance.post('/login', userData)

      setToken(data.data.token)

      reset()

      toast.success('Login success!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      })
      return navigate('/dashboard')
    } catch (e) {
      if (e?.response?.data?.error) {
        toast.error(e.response.data.error, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        })

        console.error(
          `Error: ${e.message},\n Message: ${e.response.data.error}`,
        )
        return e
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
        {!errors.email && (
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Register
