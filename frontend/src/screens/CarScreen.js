import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listCarDetails } from '../actions/carActions'

const CarScreen = ({ match }) => {
    const dispatch = useDispatch()

    const carDetails = useSelector(state => state.carDetails)
    const { loading, error, car } = carDetails

    useEffect(() => {
        dispatch(listCarDetails(match.params.id))
    }, [dispatch, match])

    return (
        <>
            <Link className='btn btn-primary my-3' to='/' >Буцах</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                <Col md={7}>
                    <Image src={car.image} alt={car.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{car.brand} {car.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6>{car.year} : {car.mYear}</h6>
                            <h6>{car.grade}</h6> 
                            <h6>{car.mile} км</h6>
                            <h5>{car.price} ₮</h5>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            )}
            
        </>
    )
}

export default CarScreen
