import React, { Children } from 'react'
import PropTypes from 'prop-types'
import Button from '../form/button'

const ListKosan = ({ allKosan = [], getKosan, handleDeleteKosan }) => {

    const Item = ({ children }) => {
        return ( <div className='w-full border border-gray-200 px-5 py-5 mb-2 rounded'>{ children }</div> )
    }

  return allKosan.map((kosan, index) => (
        <Item key={kosan.id}>
            <div className='flex justify-between items-center'>
                <div className='flex'>
                    <p className='mr-2'>{index + 1}</p>
                    <p>{kosan.name}</p>
                    <p className='ml-2 font-bold'>{kosan.place?.name}</p>
                </div>
                <div>
                    <Button className="mr-2" onClick={() => getKosan(kosan.id)}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteKosan(kosan.id)}>Delete</Button>
                </div>
            </div>
        </Item>
        ))  
}

ListKosan.propTypes = {
    allKosan : PropTypes.array.isRequired,
}

export default ListKosan