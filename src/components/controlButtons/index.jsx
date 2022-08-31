import React from 'react'
import edit from '../icons/editIcon.svg'
import options from "../icons/options.svg"
import trash from "../icons/trashIcon.svg"

function Controls({ active }) {
    return (
        <div className={`control_buttons ${active ? 'active' : ''}`}>
            <div className='control_btn'>
                <img src={edit} alt="edit" />
            </div>
            <div className='control_btn'>
                <img src={trash} alt="delete" />
            </div>
        </div>
    )
}
// Put it in board

export default Controls