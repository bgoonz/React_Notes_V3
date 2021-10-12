import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import productReducer, * as productActions from '../../store/product';
import { addItemToCart } from '../../store/cart'


const ProductPage = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector((state) => state.productsList[id])

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [retailPrice, setRetailPrice] = useState(0);
    const [productImg, setProductImg] = useState('');
    const [sizes, setSize] = useState('');
    const [selectedSize, setSelectedSize] = useState('n/a');
    const [productQty, setProductQty] = useState(1)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        dispatch(productActions.getOneProduct(id))
    }, [dispatch, id])

    useEffect(() => {
        if (product) {
            setName(product.name)
            setBrand(product.brand)
            setDescription(product.description)
            setRetailPrice(product.retailPrice)
            setProductImg(product.productImg)
            setSize(product.Sizes)
            setProductQty(productQty);
            // setStartDate('');
            // setEndDate('');

            // setInventoryNum(product.sizes.ProductSizeinventoryNum)
            // console.log("PRODUCT SIZES:   ", product.Sizes)
            // console.log("Inventory Num:   ", product.Sizes[0].ProductSize.inventoryNum)

        }
    }, [product, productQty])


    // const productOrderTotal = () => {
    //     const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    //     const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //     const orderTotal = (diffDays * rentalPrice) * productQty;
    //     return orderTotal;
    // }


    const onSubmit = (event) => {
        event.preventDefault()
        const formSubmission = {
            id,
            size: product.Sizes[selectedSize].size,
            productQty,
            startDate,
            endDate,
            rentalPrice,
            productImg,
        }
        console.log(formSubmission);
        dispatch(addItemToCart(formSubmission))
    }

    let rentalPrice;
    return (
        <div className='flex justify-evenly pt-40'>
            {product && (
                <>
                    {/* Start of Left Side */}
                    <div>
                        <img src={productImg} alt={name} className="h-80 w-80 border-gray-300 shadow-lg rounded" />
                    </div>

                    {/* End of Left Side */}
                    {/* Start of Right Side */}

                    {/* Start of Information Block */}
                    <div className="bg-white border-t-2 border-b-2 border-gray-300">
                        <div className="border-b-2 border-gray-300 p-2">
                            <h2 className="font-bold font-serif text-2xl">{brand}</h2>
                            <h3 className="text-sm">{name}</h3>
                            <div className="flex justify-between">
                                <p className="text-xs text-gray-600 pt-1 line-through">${retailPrice} original retail</p>
                                <p className="text-xs pt-1 pr-2">${rentalPrice = Math.round(((retailPrice * .04) / 5) * 5)}/day to rent</p>
                            </div>
                        </div>
                        {/* End of Information Block */}
                        {/* Start of Cart Form */}
                        <div>

                            <form onSubmit={onSubmit}>
                                {/* START: Size Block */}
                                <div className="flex justify-between border-b-2 border-gray-300 pb-2 content-center ">
                                    <div>
                                        {sizes && (
                                            < select className="text-xs"
                                                value={selectedSize}
                                                onChange={(event) => setSelectedSize(event.target.value)}
                                            >
                                                <option>Select Size</option>
                                                {sizes !== '' && sizes.map((size) => (
                                                    <option value={size.id} key={size.id}>{size.size}</option>
                                                ))}
                                            </select>)}
                                    </div>
                                    <div>
                                        <label className="text-xs">Quantity</label>
                                        <select
                                            className="text-xs"
                                            value={productQty}
                                            onChange={(event) => setProductQty(event.target.value)}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </select>
                                    </div>
                                </div>
                                {/* END: Size Block */}

                                {/* START: Calender Block */}
                                <div className="flex text-xs justify-center p-2 font-semibold">
                                    <p>DELIVERY + RETURN DATES</p>
                                </div>
                                <div className="flex justify-center text-xs p-2">
                             
                                    <p className="pr-2 pl-2">|</p>
                                    
                                </div>
                                {}
                                <div>
                                    <button type="submit" className="bg-black text-white hover:bg-opacity-75 w-full mt-2 rounded-sm text-xs p-2">Add to bag</button>
                                </div>
                            </form>
                        </div>
                        {/* END: Calender Block */}

                        {/* START: Submit Button */}

                    </div>
                </>
            )
            }
        </div >
    )
}


export default ProductPage;
