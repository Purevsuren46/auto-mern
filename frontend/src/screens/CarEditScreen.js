import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCarDetails, updateCar } from '../actions/carActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { CAR_UPDATE_RESET } from '../constants/carConstants'


const CarEditScreen = ({ match, history }) => {
    const carId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [year, setYear] = useState(0)
    const [mYear, setMyear] = useState(0)
    const [mile, setMile] = useState(0)
    const [grade, setGrade] = useState('')
    const [uploading, setUploading] = useState(false)
    
    const dispatch = useDispatch()

    const carDetails = useSelector(state => state.carDetails)
    const { loading, error, car } = carDetails

    const carUpdate = useSelector(state => state.carUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = carUpdate


    useEffect(() => {
            if(successUpdate) {
                dispatch({ type: CAR_UPDATE_RESET })
                history.push('/admin/carlist')
            } else {
                if(!car.name || car._id !== carId) {
                    dispatch(listCarDetails(carId))
                } else {
                    setName(car.name)
                    setPrice(car.price)
                    setImage(car.image)
                    setBrand(car.brand)
                    setYear(car.year)
                    setMyear(car.mYear)
                    setMile(car.mile)
                    setGrade(car.grade)
                }
            }            
    }, [dispatch, history, carId, car, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        }   catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCar({
            _id: carId,
            name,
            price,
            image,
            brand,
            year,
            mYear,
            mile,
            grade
        }))
    }

    return (
        <>
            <Link to='/admin/carlist' className='btn btn-light my-3'>
                Буцах
            </Link>
            <FormContainer>
        <h1>Машин Засах</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Модел</Form.Label>
                <Form.Control type='name' placeholder='Модел оруулах' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='price'>
                <Form.Label>Үнэ</Form.Label>
                <Form.Control type='number' placeholder='Үнэ оруулах' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
            <Form.Label>Зураг</Form.Label>
                <Form.Control type='text' placeholder='Зурагны URL оруулах' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
            <Form.Label>Брэнд</Form.Label>
                <Form.Control type='text' placeholder='Брэнд оруулах' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='year'>
                <Form.Label>Үйлдвэрлэсэн он</Form.Label>
                <Form.Control type='number' placeholder='Он оруулах' value={year} onChange={(e) => setYear(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='mYear'>
                <Form.Label>Орж ирсэн он</Form.Label>
                <Form.Control type='number' placeholder='Он оруулах' value={mYear} onChange={(e) => setMyear(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='mile'>
                <Form.Label>Гүйлт</Form.Label>
                <Form.Control type='number' placeholder='Гүйлт оруулах' value={mile} onChange={(e) => setMile(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='grade'>
                <Form.Label>Үнэлгээ</Form.Label>
                <Form.Control type='text' placeholder='Үнэлгээ оруулах' value={grade} onChange={(e) => setGrade(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Шинэчлэх
            </Button>
        </Form>
        )}
        </FormContainer>
        </>
    )       
}

export default CarEditScreen
