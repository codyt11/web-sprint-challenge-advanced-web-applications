import React, {useState} from 'react';
import { axiosAuth } from './utils/axiosAuth'

const AddForm = ({updateColors}) => {
    const [newColor, setNewColor] = useState({
        color: "",
        code: { hex: "" }
    })

    const handleChange = e => {
        e.target.name === 'hex' ?
        setNewColor({...newColor, code: {hex: e.target.value}}) :
        setNewColor({...newColor, [e.target.name]: e.target.value})
        
    }

    const handleSubmit = e => {
        e.preventDefault();
       axiosAuth().post('colors', newColor)
       .then(res => {
           updateColors(res.data)
       })
    }

    return(
        <form onSubmit={handleSubmit} >
            <input type='text' name='color' placeholder='Color name' onChange={handleChange} />
            <input type='text' name='hex' placeholder='Hex value' onChange={handleChange} />
            <input type='submit' />
        </form>
    )
}

export default AddForm;