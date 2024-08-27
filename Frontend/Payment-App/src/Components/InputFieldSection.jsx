export function InputFieldSection({ fieldName, placeholder, value, onChange }) {
    return (
        <div className="flex flex-col m-2">
            <b>{fieldName}</b>
            <input type="text" placeholder={placeholder} value={value || ""}
                onChange={onChange} className="border border-black rounded-md p-1"></input>
        </div>
    )
}