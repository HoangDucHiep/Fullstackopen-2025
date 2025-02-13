const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>

{props.inputs.map(i => <FormInput key={`${i.lable}`} input={i}></FormInput>)}
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const FormInput = ({ input }) => {
    return (
        <div >
            {input.lable}: <input value={input.value} onChange={input.onChangeFunc} />
        </div>
    )
}

export default PersonForm
export { FormInput }