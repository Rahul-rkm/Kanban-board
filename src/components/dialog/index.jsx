import { useState } from "react"
import './dialog.scss'

const Dialog = (props) => {
    let inName = props.name ? props.name : '';
    let inLink = props.link ? props.link : '';
    const [name, setName] = useState(inName);
    const [link, setLink] = useState(inLink);
    let title = ''
    if (props.dialogType === 'card') {
        title = (props.dialogMode === 'edit') ? '✍ Card' : '➕ New Card';
    }
    else {
        title = (props.dialogMode === 'edit') ? '✍ Bucket' : '➕ New Bucket';
    }
    const nameHandler = (e) => {
        setName(e.target.value);
    }
    const linkHandler = (e) => {
        setLink(e.target.value);
    }
    const closeDialog = () => {
        props.closeDialog();
    }
    const submitHandler = (e) => {
        e.preventDefault();
        props.saveData({ title: name, link: link }, props.dialogMode, props.dialogType)
    }
    return (
        <div className={`dialog-container ${props.active ? 'active' : ''}`}>
            <div className="dialog-container-title">{title}</div>
            <form onSubmit={submitHandler}>
                <input required className="title text" type="text" placeholder={`${title.slice(1)} name`}
                    value={name} onInput={nameHandler} />
                {props.dialogType === 'card' ? (
                    <input required className="link text" type="url" value={link}
                        placeholder='Paste the link here' onInput={linkHandler} />
                ) : (<></>)}
                <div style={{ display: 'flex', }}>
                    <button type="submit">Save</button>
                    <button onClick={closeDialog} type="reset">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default Dialog;