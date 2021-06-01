import {
    VARIANT_LIST_REQUEST,
    VARIANT_LIST_SUCCESS,
    VARIANT_LIST_FAIL,
    VARIANT_DETAILS_REQUEST,
    VARIANT_DETAILS_SUCCESS,
    VARIANT_DETAILS_FAIL,
    VARIANT_DELETE_REQUEST,
    VARIANT_DELETE_SUCCESS,
    VARIANT_DELETE_FAIL,
    VARIANT_CREATE_RESET,
    VARIANT_CREATE_FAIL,
    VARIANT_CREATE_SUCCESS,
    VARIANT_CREATE_REQUEST,
    VARIANT_UPDATE_REQUEST,
    VARIANT_UPDATE_SUCCESS,
    VARIANT_UPDATE_FAIL,
    VARIANT_UPDATE_RESET,
  } from '../constants/variantConstants'

export const variantListReducer = (state = { variants: [] }, action) => {
    switch (action.type) {
      case VARIANT_LIST_REQUEST:
        return { loading: true, variants: [] }
      case VARIANT_LIST_SUCCESS:
        return {
          loading: false,
          variants: action.payload.variants,
          pages: action.payload.pages,
          page: action.payload.page,
        }
      case VARIANT_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const variantDetailsReducer = (
    state = { variant: { } },
    action
  ) => {
    switch (action.type) {
      case VARIANT_DETAILS_REQUEST:
        return { ...state, loading: true }
      case VARIANT_DETAILS_SUCCESS:
        return { loading: false, variant: action.payload }
      case VARIANT_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const variantDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case VARIANT_DELETE_REQUEST:
        return { loading: true }
      case VARIANT_DELETE_SUCCESS:
        return { loading: false, success: true }
      case VARIANT_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const variantCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case VARIANT_CREATE_REQUEST:
        return { loading: true }
      case VARIANT_CREATE_SUCCESS:
        return { loading: false, success: true, variant: action.payload }
      case VARIANT_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case VARIANT_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const variantUpdateReducer = (state = { variant: {} }, action) => {
    switch (action.type) {
      case VARIANT_UPDATE_REQUEST:
        return { loading: true }
      case VARIANT_UPDATE_SUCCESS:
        return { loading: false, success: true, variant: action.payload }
      case VARIANT_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case VARIANT_UPDATE_RESET:
        return { variant: {} }
      default:
        return state
    }
  }