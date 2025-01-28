import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { ProductContext } from './ProductContext'; // Import the context
import classes from './HomeStyles.module.css'


function Home(){
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { setProductsItemsForShoppingCart } = useContext(ProductContext); // Access the context

    const BASE_URL = "https://fakestoreapi.com/products?limit=10"
    
    // fetch data from api
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            const response = await fetch(`${BASE_URL}`)
            const products = await response.json()

            // Add a `quantity` field to each product
            const productsWithQuantity = products.map((product) => ({
                ...product,
                quantity: 0, // Initialize quantity to 0
            }))

            setProducts(productsWithQuantity)
            setIsLoading(false)
        }

        fetchProducts()
    }, [])

    const handleIncrement = (id) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        )
      }
    
      const handleDecrement = (id) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id
              ? { ...product, quantity: Math.max(product.quantity - 1, 0) } // Prevent going below 0
              : product
          )
        )
      }
    
      const handleAddToCart = (productId) => {
        const cartItems = products.filter((product) => product.quantity > 0)
        
        setProductsItemsForShoppingCart((prevCartItems) => {
            const updatedCart = [...prevCartItems]
        
            cartItems.forEach((newItem) => {
              const existingItem = updatedCart.find((item) => item.id === newItem.id)
              if (existingItem) {
                // Update the quantity of existing item
                existingItem.quantity += newItem.quantity
              } else {
                // Add new item
                updatedCart.push(newItem)
              }
            })
        
            return updatedCart
          });

          // Reset the quantity for the product in the main product list after adding to the cart
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId ? { ...product, quantity: 0 } : product
            )
          );
    }

    if(isLoading){
        return <div className={classes.spinner}><img src="./spinner/spinner.gif" alt="" /></div>
    }

    return (
        <div className={classes.container}>
            <nav className={classes.navBar}>
                <Link className={classes.linkStyle} to="/home">Home</Link>
                <Link className={classes.linkStyle} to="/shoppingCart">Shopping cart</Link>
            </nav>

            <div className={classes.productContainer}>
                {products.map((product) => {
                    return <div key={product.id} className={classes.itemContainer}>
                        <h3>{product.title}</h3>
                        <img src={product.image} className={classes.imgStyle}/>
                        <p>Category: {product.category}</p>
                        <p>{product.description}</p>
                        <p>Rating: {product.rating.rate}</p>
                        <p>${product.price}</p>

                        <div className={classes.counterContainer}>
                            <button onClick={() => handleDecrement(product.id)} className={classes.incrementalDecrementalBtn}>-</button>
                            <span style={{ margin: "0 10px" }} className={classes.counter}>{product.quantity}</span>
                            <button onClick={() => handleIncrement(product.id)} className={classes.incrementalDecrementalBtn}>+</button>
                        </div>
                        
                        <button onClick={() => handleAddToCart(product.id)} className={classes.addBtn}>Add</button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home