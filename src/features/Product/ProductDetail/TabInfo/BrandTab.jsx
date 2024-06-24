import React from 'react'
import { useGetBrandInfoByIdQuery, useGetDescriptionInfoByIdQuery } from '@/apis/productApi'

const BrandTab = ({ brandId }) => {
    const brandInfo = useGetBrandInfoByIdQuery(brandId);
    return (
        <div>
            <h1>{brandInfo.data?.name}</h1>
            <p>{brandInfo.data?.description}</p>
        </div>
    )
}

export default BrandTab