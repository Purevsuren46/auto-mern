import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Car from '../components/Car'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listCars } from '../actions/carActions'



const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const carList = useSelector(state => state.carList)
    const { loading, error, cars } = carList

    useEffect(() => {
        dispatch(listCars(keyword))
    }, [dispatch, keyword])

    return (
        <>
            <Meta />
            <h1>Машинууд</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            <Row>
                {cars.map(car => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Car car={car} />
                    </Col>
                ) )}
            </Row>}
        </>
    )
}

export default HomeScreen
