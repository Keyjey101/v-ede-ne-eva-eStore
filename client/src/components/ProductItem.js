import React, { useContext } from 'react';
import { Card, Col} from 'react-bootstrap';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { useHistory } from 'react-router';
import { PRODUCT_ROUTE } from '../utils/constants';
import { Context } from '../index';


const ProductItem = ({products}) => {
       
    const {product} = useContext(Context)

    

const thisType = product.types.filter(i => i.id === products.typeId)


const raiting = (x) =>{
    let rounded = Math.round(x*2)/2
    switch (rounded) {



        case 1:
           return <>
<StarIcon/> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon />
            </>

case 1.5:
    return <>
<StarIcon/> <StarHalfIcon /> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon />
     </>

case 2:
    return <>
<StarIcon/><StarIcon/> <StarBorderIcon /> <StarBorderIcon /> <StarBorderIcon />
            </>

case 2.5:
    return <>
<StarIcon/><StarIcon/> <StarHalfIcon /> <StarBorderIcon /> <StarBorderIcon />
            </>

case 3:
    return <>
<StarIcon/> <StarIcon/><StarIcon/> <StarBorderIcon /> <StarBorderIcon />
            </>

case 3.5:
    return <>
<StarIcon/><StarIcon/> <StarIcon /> <StarHalfIcon /> <StarBorderIcon />
            </>

case 4:
    return <>
<StarIcon/> <StarIcon/><StarIcon/><StarIcon/> <StarBorderIcon />
            </>

case 4.5:
    return <>
<StarIcon/><StarIcon/> <StarIcon /> <StarIcon /> <StarHalfIcon />
            </>

case 5:
    return  <>
<StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> 
            </>

default:
  return  <><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /></>
    }
}

const history = useHistory()

    return (
        <Col md={4} onClick={() => history.push(PRODUCT_ROUTE + '/' + products.id)}>

            <Card 
            style={{ cursor: 'pointer'}} 
            border={'light'}
            className='card-product'>


<Card.Img variant="top" src={process.env.REACT_APP_API_URL + products.img} width={200} height={200}/>


<small className="text-muted">{thisType[0]?.name || 'Удаленный тип'}</small>
<Card.Body>
<Card.Title className='mb-2'>{products.name}</Card.Title>
<div style={{color: '#1B2021'}}>
{raiting(products.raiting)}
</div>
</Card.Body>
<div>
    
    
</div>


            </Card>
            
</Col>



  
    )
}

export default ProductItem