import '../style/Search.scss';
const Search = ({ inputValue, onInputChange }) => {
    return (
        <input
            type='text'
            value={inputValue}
            onChange={onInputChange}
            placeholder='Search Products'
            className='text-xl w-60 ml-8 outline-none rounded-md px-3'
        />
    );
};

export default Search;
