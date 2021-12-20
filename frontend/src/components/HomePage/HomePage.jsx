import React, {useEffect, useState} from 'react'
import { getPopularProducts, getTopProduct } from '../../app/reducers/products'
import {useDispatch, useSelector} from 'react-redux'
import ProductTable from '../Table/ProductTable';
import TopProduct from '../TopProduct/TopProduct';

export default function HomePage() {
    const [topProduct, setTopProduct] = useState(null);
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)

    useEffect(() => {
        if (products.length > 0) {
            setTopProduct(products[0]);
        } else {
             dispatch(getPopularProducts())
        }
    },[products])
    
    return (
        <div>
            <h2 className='text-center page-heading'>Dashboard</h2>
                <div className='container'>
                {
                    topProduct &&
                    <TopProduct topProduct={topProduct} />
                }
                { products.length > 0 && 
                        <ProductTable products={products} />
                    
                }
                </div>
        </div>
    )
}
