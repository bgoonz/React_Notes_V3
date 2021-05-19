import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as orderActions from '../../store/order';


const ShoppingCart = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const order = useSelector((state) => state.orderList[id]);

    const [orderDate, setOrderDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [orderTotal, setOrderTotal] = useState(0);
    const [productQty, setProductQty] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [name, setName] = useState('');
    const [retailPrice, setRetailPrice] = useState(0);
    const [orderItems, setOrderItems] = useState('');
    const [size, setSize] = useState('');


    useEffect(() => {
        dispatch(orderActions.getOneOrder(id))
    }, [dispatch, id])

    useEffect(() => {
        if (order) {
            setStartDate(order.startDate)
            setEndDate(order.endDate)
            setOrderTotal(order.orderTotal)
            setOrderItems(order.OrderItems);
            // setOrderItems(order.OrderItems);
            // setProductQty(order.productQty)
            console.log("PRODUCT QUANTITY:   ", orderItems)
            // console.log('PRODUCT SIZE')
        }
    }, [order, orderItems])

    return (
        <div>
            { order && (
                <>
                    <div>
                        <p>{order.startDate}</p>
                    </div>
                    <div>
                        <table className="table-auto">
                            <thead>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Quantity</th>
                            </thead>
                            <tbody>
                                {orderItems && (
                                    orderItems.map((item) => (
                                        <tr>
                                            <td key={item.Product.name}>{item.Product.name}</td>
                                            <td key={item.Product.retailPrice}>{item.Product.retailPrice}</td>
                                            {/* <td>{item.Product.Size.size}</td> */}

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )
            }
        </div >
    )
}

export default ShoppingCart;
