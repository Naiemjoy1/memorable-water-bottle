import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css';
import { addToLS, getStoredCart, removeFromLS } from "../../utilities/Localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {

    const [bottles, setBotttles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBotttles(data))
    },[])

    // load cart from local storage 
    useEffect(() => {
        console.log('called the useEffect', bottles.length);
        if (bottles.length) {
            const storedCart = getStoredCart();
            console.log(storedCart, bottles);

            const savedCart = [];
            for(const id of storedCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    savedCart.push(bottle)
                }
            }

            console.log('saved cart', savedCart);
            setCart(savedCart);
        }
    }, [bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id);
    }

    const handleRemoveFromCart = bottle => {
        removeFromLS(id);
    }

    return (
        <div>
            <h4>Bottles Available: {bottles.length}</h4>
            <Cart cart={cart} handleRemoveFromCart ={handleRemoveFromCart}></Cart>

            <div className="bottle-container">
            {
                bottles.map(bottle => <Bottle 
                    key={bottle.id} 
                    bottle={bottle}
                    handleAddToCart={handleAddToCart}
                    ></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;