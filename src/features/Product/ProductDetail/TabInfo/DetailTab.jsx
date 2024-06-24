import React from 'react'

const DetailTab = ({ description }) => {

    return (
        <div>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
    )
}

export default DetailTab