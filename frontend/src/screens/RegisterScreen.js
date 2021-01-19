import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Нууц үг буруу байна')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return <FormContainer>
        <h1>Бүртгүүлэх</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Нэр</Form.Label>
                <Form.Control type='name' placeholder='Нэр оруулах' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Имэйл хаяг</Form.Label>
                <Form.Control type='email' placeholder='Имэйл оруулах' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Нууц үг</Form.Label>
                <Form.Control type='password' placeholder='Нууц үг оруулах' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Нууц үг дахин оруулах</Form.Label>
                <Form.Control type='password' placeholder='Нууц үг дахин оруулах' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary'>
                Бүртгүүлэх
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Бүртгэлтэй юу? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Нэвтрэх</Link>
            </Col>
        </Row>

    </FormContainer>
}

export default RegisterScreen
