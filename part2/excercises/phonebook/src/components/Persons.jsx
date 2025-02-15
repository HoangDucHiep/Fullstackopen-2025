const Persons = ({ persons, handleDelete }) => {

    return (
        <div>
            {persons.map(p => <p key={p.name}>{p.name}: {p.number} {<button onClick={() => { handleDelete(p.id) }}>Delete</button> }</p>)}
        </div>
    )
}

export default Persons;