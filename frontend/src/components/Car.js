import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Car = ({ car }) => {
    return (
        <Card className='my-3 ' border="secondary">
            <Link to={`/car/${car._id}`}>
                <Card.Img src={car.image} variant='top' />
            </Link>
            
            <Card.Body >
            <Link to={`/car/${car._id}`}>
                <Card.Title as='div'>
                    <strong>{car.brand} {car.name} {car.year} {car.mYear}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <div className='mt-3'>
                {car.grade}   {car.price} ₮ • {car.mile} км 
                </div>
            </Card.Text>
            
            </Card.Body>
        </Card>
    )
}

export default Car
