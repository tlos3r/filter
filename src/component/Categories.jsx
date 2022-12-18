import '../style/Categories.scss';
const Categories = (categories, filterItems) => {
    return (
        <>
            <ul className='flex space-x-4 justify-end'>
                <li>
                    <a
                        href='#'
                        className='py-2 px-1 text-white border rounded-md border-solid hover:bg-pink-300 active:bg-pink-400 '
                        onClick={() => filterItems(category)}
                    >
                        All
                    </a>
                </li>
            </ul>
        </>
    );
};

export default Categories;
