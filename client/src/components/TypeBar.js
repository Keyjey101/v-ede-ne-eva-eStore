import React, { useContext } from 'react';
import {observer} from 'mobx-react-lite'
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
    const {product} = useContext(Context)
    
    return (
        <ListGroup>
<ListGroup.Item
style={(!product.selectedType) ? {cursor: 'pointer', textDecoration: 'underline 2px solid green', fontWeight: 'bold'} :{cursor: 'pointer'} }
onClick={() => {product.setSelectedType({})}}
>
    Все типы
</ListGroup.Item>

            {product.types.map(type =>
                <ListGroup.Item
                    style={(type.id === product.selectedType.id) ? {cursor: 'pointer', textDecoration: 'underline 2px solid green', fontWeight: 'bold'} :{cursor: 'pointer'} }
                    key={type.id}
                    onClick={() => {product.setSelectedType(type)}}
                    
                >
                    {type.name}
                </ListGroup.Item>
            )}


</ListGroup>

  
    )
})

export default TypeBar