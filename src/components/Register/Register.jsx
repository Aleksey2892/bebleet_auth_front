import { axiosInstance } from '../../api/axiosSettings'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Bounce, toast } from 'react-toastify'

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = async userData => {
    try {
      await axiosInstance.post('/register', userData)
      reset()

      toast.success('Register success!', {
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

      return navigate('/login')
    } catch (e) {
      if (e?.response?.data?.error) {
        console.error(
          `Error: ${e.message},\n Message: ${e.response.data.error}`,
        )

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
      }
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && (
            <Form.Text className="text-danger">
              {errors.firstName.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && (
            <Form.Text className="text-danger">
              {errors.lastName.message}
            </Form.Text>
          )}
        </Form.Group>

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
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
          {!errors.email && (
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Mobile phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone"
            {...register('phone', {
              pattern: {
                value: /^\d+$/,
                message: 'Phone number must contain only digits',
              },
            })}
          />
          {errors.phone && (
            <Form.Text className="text-danger">
              {errors.phone.message}
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
    </>
  )
}

export default Register
