import '../style/Product.scss';
import Search from './Search';
import Categories from './Categories';
import { useState, useEffect } from 'react';
const Product = () => {
    const [allProducts, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    // call api for product
    const fetchProduct = async () => {
        setIsLoading(true);
        setError(false);
        try {
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();
            setProducts(data.products);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(true);
            setIsLoading(false);
        }
    };
    // load api
    useEffect(() => {
        fetchProduct();
    }, []);
    // get value input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    // filter product from input value
    useEffect(() => {
        setFilteredProducts(
            allProducts.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
        );
    }, [allProducts, search]);
    // get categories from api
    const getAllCategories = () => {
        setCategories(['all', ...new Set(allProducts.map((product) => product.category))]);
    };
    setTimeout(getAllCategories, 5000);
    const filterProducts = (category) => {
        if (category === 'all') {
            setProducts(allProducts);
            return;
        }
        const newProducts = allProducts.filter((product) => product.category === category);
        setProducts(newProducts);
    };

    return (
        <>
            <div className='flex justify-around'>
                <Search inputValue={search} onInputChange={handleSearch} />
                <Categories categories={categories} />
            </div>
            <main className='container mx-auto flex justify-center items-center px-5'>
                <div className='columns-1 sm:columns-2 md:columns-4 gap-8'>
                    {isLoading && <div className='dot'></div>}
                    {error ? (
                        <h4 className='text-center'>Can't fetch data</h4>
                    ) : (
                        filteredProducts.map((product) => {
                            const { id, price, title, thumbnail } = product;
                            return (
                                <div key={id} className='inline-block pt-12'>
                                    <img src={thumbnail} alt='' className='h-96' />
                                    <div className='bg-white'>
                                        <p className='text-center font-bold size text-2xl'>{title}</p>
                                        <div className='flex justify-between buy text-center px-3'>
                                            <p className=' my-auto'>{price} $</p>
                                            <button className='bg-orange-500 text-white px-2 py-1 rounded-md'>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
        </>
    );
};

export default Product;
