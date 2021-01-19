import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listCars, deleteCar, createCar } from '../actions/carActions'
import { CAR_CREATE_RESET } from '../constants/carConstants'

const CarListScreen = ({ history, match }) => {
    const dispatch = useDispatch() 

    const carList = useSelector(state => state.carList)
    const { loading, error, cars } = carList

    const carDelete = useSelector(state => state.carDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = carDelete

    const carCreate = useSelector(state => state.carCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, car: createdCar } = carCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: CAR_CREATE_RESET })

        if(!userInfo.isAdmin) {
            history.push('/login')
        } 

        if(successCreate) {
            history.push(`/admin/car/${createdCar._id}/edit`)
        } else {
            dispatch(listCars())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdCar])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteCar(id))
        }
        
    }

    const createCarHandler = () => {
        dispatch(createCar())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Машинууд</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createCarHandler}>
                        <i className='fas fa-plus'></i> Машин Үүсгэх
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>НЭР</th>
                            <th>ҮНЭ</th>
                            <th>БРЭНД</th>
                            <th>ҮЙЛДВЭРЛЭСЭН ОН</th>
                            <th>ОРЖ ИРСЭН ОН</th>
                            <th>ЯВСАН КМ</th>
                            <th>ҮНЭЛГЭЭ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car._id}>
                                <td>{car._id}</td>
                                <td>{car.name}</td>
                                <td>
                                    {car.price}₮
                                </td>
                                <td>
                                    {car.brand}
                                </td>
                                <td>{car.year}</td>
                                <td>{car.mYear}</td>
                                <td>{car.mile}</td>
                                <td>{car.grade}</td>
                                <td>
                                    <LinkContainer to={`/admin/car/${car._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(car._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default CarListScreen
