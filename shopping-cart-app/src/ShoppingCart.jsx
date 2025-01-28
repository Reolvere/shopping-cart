import { Link } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from './ProductContext'; // Import the context
import classes from './ShoppingCartStyles.module.css'

function ShoppingCart(){
    
    const { productsItemsForShoppingCart, setProductsItemsForShoppingCart } = useContext(ProductContext); // Access cart items
    
    //counting total price 
    let totalPrice = 0
    productsItemsForShoppingCart.map((product) => {
        let productsTotalPrice = 0
        productsTotalPrice = product.price * product.quantity
        totalPrice += productsTotalPrice
    })

    //remove item from an array
    function removeCartBtn(index) {
        const newProductsItemsArray = productsItemsForShoppingCart
        newProductsItemsArray.splice(index, 1)
        setProductsItemsForShoppingCart([...newProductsItemsArray])
    }

    if(productsItemsForShoppingCart.length === 0) {
        return (
            <p className={classes.noItems}>No items in the cart.</p>
        )
    }
    
    return(
        <div className={classes.ShoppingCartContainer}>
            <nav className={classes.navBar}>
                <Link to="/home" className={classes.linkStyle}>Home</Link>
                <Link to="/shoppingCart" className={classes.linkStyle}>Shopping cart</Link>
            </nav>
            <div className={classes.productContainer}>
                { productsItemsForShoppingCart && productsItemsForShoppingCart.map((product, index) => {
                    return (
                        <div key={product.id} className={classes.itemContainer}>
                            <img src={product.image} className={classes.productImage}/>
                            <h3>{product.title}</h3>
                            <p className={classes.productQuantity}>X{product.quantity}</p>
                            <p className={classes.totalPrice}>Total: ${product.price * product.quantity}</p>
                            <button onClick={() => removeCartBtn(index)} className={classes.removeBtn}>X</button>
                        </div>
                    )
                })}
                <div className={classes.buyContainer}>
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <button className={classes.buyBtn}>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart