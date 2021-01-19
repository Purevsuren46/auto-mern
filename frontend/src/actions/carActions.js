import axios from 'axios'
import { CAR_LIST_REQUEST, CAR_LIST_SUCCESS, CAR_LIST_FAIL, CAR_DETAILS_REQUEST, CAR_DETAILS_SUCCESS, CAR_DETAILS_FAIL, CAR_DELETE_REQUEST, CAR_DELETE_SUCCESS, CAR_DELETE_FAIL, CAR_CREATE_REQUEST, CAR_CREATE_SUCCESS, CAR_CREATE_FAIL, CAR_UPDATE_REQUEST, CAR_UPDATE_SUCCESS, CAR_UPDATE_FAIL} from '../constants/carConstants'

export const listCars = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: CAR_LIST_REQUEST })

        const { data } = await axios.get(`/api/cars?keyword=${keyword}`)

        dispatch({
            type: CAR_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CAR_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listCarDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CAR_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/cars/${id}`)

        dispatch({
            type: CAR_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CAR_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteCar = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CAR_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/cars/${id}`, config)

        dispatch({
            type: CAR_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: CAR_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createCar = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CAR_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/cars`, {}, config)

        dispatch({
            type: CAR_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CAR_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateCar = (car) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CAR_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/cars/${car._id}`, car, config)

        dispatch({
            type: CAR_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CAR_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}