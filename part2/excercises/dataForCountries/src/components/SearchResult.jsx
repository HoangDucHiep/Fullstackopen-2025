const SearchResult = ({ results, handleShowCountry }) => {
    return (
        <>
            {results.length > 9 ? (
                'Too many matches, specify another filter'
            ) : (
                <>
                    {results.map(r => <SearchResultItem key={r.name.common} value={r.name.common} handleOnclick={() => { handleShowCountry(r) }}></SearchResultItem>)}
                </>        
            )}
        </>
    )
}

const SearchResultItem = ({ value, handleOnclick }) => (<div>{value} <button onClick={handleOnclick}>show</button></div>)

export default SearchResult