import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
	listVariants,
	deleteVariant,
	createVariant,
} from '../actions/variantActions'
import { VARIANT_CREATE_RESET } from '../constants/variantConstants'

const VariantListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const variantList = useSelector((state) => state.variantList)
	const { loading, error, variants, page, pages } = variantList

	const variantDelete = useSelector((state) => state.variantDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = variantDelete

	const variantCreate = useSelector((state) => state.variantCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		variant: createdVariant,
	} = variantCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: VARIANT_CREATE_RESET })

		if (!userInfo || (!userInfo.isAdmin && !userInfo.isSuperAdmin)) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`/admin/variant/${createdVariant._id}/edit`)
		} else {
			dispatch(listVariants('', pageNumber))
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdVariant,
		pageNumber,
	])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteVariant(id))
		}
	}

	const createProductHandler = () => {
		dispatch(createVariant())
	}

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Variants</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Variant
          </Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>TYPE</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{variants.map((variant) => (
								<tr key={variant._id}>
									<td>{variant._id}</td>
									<td>{variant.name}</td>
									<td>{variant.type}</td>
									<td>
										<LinkContainer to={`/admin/variant/${variant._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(variant._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	)
}

export default VariantListScreen
