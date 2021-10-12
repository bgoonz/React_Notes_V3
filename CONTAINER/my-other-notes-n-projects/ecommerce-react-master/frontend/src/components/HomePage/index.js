import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../store/product';
import './homepage.css'

const HomePage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActions.getAllProducts())
    }, [dispatch]);

    const products = useSelector((state) => Object.values(state.productsList))

    return (
        <div className="home-page">
            <div className="home-page-grid">
                {products &&
                products.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}`}>
                        <img className="hover:grow hover:shadow-lg" src={product.productImg} alt={product.name} />
                        <div className="pt-3 flex items-center justify-between">
                            <p className="">{product.name}</p>
                            <img  className="h-6 w-6 fill-current text-gray-500 hover:text-black"  viewBox="0 0 24 24">
                               </img>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HomePage;
