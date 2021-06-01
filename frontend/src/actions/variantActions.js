import axios from 'axios'
import { VARIANT_CREATE_FAIL, VARIANT_CREATE_REQUEST, VARIANT_CREATE_SUCCESS, VARIANT_DELETE_FAIL, VARIANT_DELETE_REQUEST, VARIANT_DELETE_SUCCESS, VARIANT_DETAILS_FAIL, VARIANT_DETAILS_REQUEST, VARIANT_DETAILS_SUCCESS, VARIANT_LIST_FAIL, VARIANT_LIST_REQUEST, VARIANT_LIST_SUCCESS, VARIANT_UPDATE_FAIL, VARIANT_UPDATE_REQUEST, VARIANT_UPDATE_SUCCESS } from '../constants/variantConstants'

import { logout } from './userActions'

export const listVariants = (keyword = '', pageNumber = '') => async (
	dispatch
) => {
	try {
		dispatch({ type: VARIANT_LIST_REQUEST })

		const { data } = await axios.get(
			`/api/variants?keyword=${keyword}&pageNumber=${pageNumber}`
		)

		dispatch({
			type: VARIANT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: VARIANT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listVariantDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: VARIANT_DETAILS_REQUEST })

		const { data } = await axios.get(`/api/variants/${id}`)

		dispatch({
			type: VARIANT_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: VARIANT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteVariant = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VARIANT_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete(`/api/variants/${id}`, config)

		dispatch({
			type: VARIANT_DELETE_SUCCESS,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: VARIANT_DELETE_FAIL,
			payload: message,
		})
	}
}

export const createVariant = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: VARIANT_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(`/api/variants`, {}, config)

		dispatch({
			type: VARIANT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: VARIANT_CREATE_FAIL,
			payload: message,
		})
	}
}

export const updateVariant = (variant) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VARIANT_UPDATE_REQUEST,
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

		const { data } = await axios.put(
			`/api/variants/${variant._id}`,
			variant,
			config
		)

		dispatch({
			type: VARIANT_UPDATE_SUCCESS,
			payload: data,
		})
		dispatch({ type: VARIANT_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: VARIANT_UPDATE_FAIL,
			payload: message,
		})
	}
}