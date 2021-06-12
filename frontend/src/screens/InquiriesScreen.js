import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import axios from 'axios'

const InquiriesScreen = ({ history }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchInquires = async () => {
        const { data } = await axios.get(`/api/inquiries/`, config)
        setInquiries(data.inquiries);
    }

    useEffect(() => {
        setLoading(true)
        if (userInfo && (userInfo.isHelpDeskAdmin || userInfo.isSuperAdmin)) {
            fetchInquires()
            setLoading(false)
        } else {
            history.push('/login')
        }
    }, [history, userInfo])

    return (
        <>
            <h1>Inquiries</h1>
            {loading ? (
                <Loader />
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inquiry, index) => (
                            <tr key={index}>
                                <td>{inquiry.chatWith}</td>
                                <td>{inquiry.name}</td>
                                <td>
                                    <LinkContainer to={`/chat/${inquiry.chatWith}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Chat
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default InquiriesScreen
