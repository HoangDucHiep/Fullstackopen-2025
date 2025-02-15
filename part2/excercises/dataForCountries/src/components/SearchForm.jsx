const SearchForm = ({label, value, handleInput}) => {
    return (
        <div>
            {label} <input value={value} onChange={handleInput}></input>
        </div>
    )
}

export default SearchForm