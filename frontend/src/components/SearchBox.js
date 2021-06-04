import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState("All")
  const [price, setPrice] = useState(0)
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    const { data } = await axios.get(`/api/products/categories`)
    setCategories(data.categories);
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    if (price <= 0 && keyword.trim() === '' && category === 'All') {
      history.push('/')
    } else {
      history.push(`/search/${keyword.trim() === '' ? 'All' : keyword}/${category}/${price ? price : 0}`)
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        size="sm"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-2'
      ></Form.Control>
      <Form.Control
        as="select"
        size="sm"
        className='mr-sm-2'
        onChange={(e) => setCategory(e.target.value)}>
        {categories.map((categoryName, index) => (<option key={index}>{categoryName}</option>))}
      </Form.Control>
      <Form.Control
        type='number'
        name='p'
        min={0}
        size="sm"
        onChange={(e) => setPrice(e.target.value)}
        placeholder='Price Less Than'
        className='mr-sm-2'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
