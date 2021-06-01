import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listVariantDetails, updateVariant } from '../actions/variantActions'
import { VARIANT_UPDATE_RESET } from '../constants/variantConstants'

const VariantEditScreen = ({ match, history }) => {
  const variantId = match.params.id

  const [name, setName] = useState('')
  const [type, setType] = useState(0)

  const dispatch = useDispatch()

  const variantDetails = useSelector((state) => state.variantDetails)
  const { loading, error, variant } = variantDetails

  const variantUpdate = useSelector((state) => state.variantUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = variantUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VARIANT_UPDATE_RESET })
      history.push('/admin/variantlist')
    } else {
      if (!variant.name || variant._id !== variantId) {
        dispatch(listVariantDetails(variantId))
      } else {
        setName(variant.name)
        setType(variant.type)
      }
    }
  }, [dispatch, history, variantId, variant, successUpdate])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateVariant({
        _id: variantId,
        name,
        type,
      })
    )
  }

  return (
    <>
      <Link to='/admin/variantlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Variant</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='type'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter type'
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default VariantEditScreen
