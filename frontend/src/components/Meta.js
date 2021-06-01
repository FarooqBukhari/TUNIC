import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To TUNIC',
  description: 'ONE STOP FOR ALL YOUR GARMENTS AND ACCESSORIES',
  keywords: 'tees,shirts,denim,shoes,bags',
}

export default Meta
