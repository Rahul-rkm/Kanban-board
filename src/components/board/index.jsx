import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Card from "../card";
// import mockData from "../../mockData";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Dialog from "../dialog";
import edit from "../icons/editIcon.svg";
import trash from "../icons/trashIcon.svg";

const LSItemName = "rkm-kanban-board";

const Board = () => {
    const [board, setBoard] = useState(localStorage.getItem(LSItemName) ? JSON.parse(localStorage.getItem(LSItemName)) : []);

    useEffect(() => {
        localStorage.setItem(LSItemName, JSON.stringify(board));
    }, [board]);

    const onDragEnd = async result => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = board.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = board.findIndex(e => e.id === destination.droppableId)
            const cloneBoard = await JSON.parse(JSON.stringify(board));
            const sourceCol = cloneBoard[sourceColIndex]
            const destinationCol = cloneBoard[destinationColIndex]

            const sourceCards = [...sourceCol.cards]
            const destinationCards = [...destinationCol.cards]

            const [removed] = sourceCards.splice(source.index, 1)
            destinationCards.splice(destination.index, 0, removed)

            cloneBoard[sourceColIndex].cards = sourceCards
            cloneBoard[destinationColIndex].cards = destinationCards

            setBoard(() => cloneBoard);
        }
        else {
            // console.log(result);
            const cloneBoard = await JSON.parse(JSON.stringify(board))
            let colIndex = cloneBoard.findIndex(e => e.id === source.droppableId);
            const column = cloneBoard[colIndex];
            const buffer = [...column.cards];
            const [removed] = buffer.splice(source.index, 1);
            buffer.splice(destination.index, 0, removed);
            cloneBoard[colIndex].cards = buffer;
            setBoard(() => cloneBoard)
        }
    }
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('bucket');
    const [dialogData, setDialogData] = useState({});
    const [dialogMode, setDialogMode] = useState('create'); // create/ edit
    const [targetObj, setTargetObj] = useState({});
    // create or edit card/bucket => main action: setOpenDialog(true); setDialogType;
    //          setDialogMode; setDialogData; 

    const createBucketHandler = () => { // 🤏
        setOpenDialog(true);
        setDialogType('bucket');
        setDialogMode('create');
    }
    const createCardHandler = (e) => {  // 🤏 card
        setOpenDialog(true);
        setDialogType('card');
        setDialogMode('create');
        let bucketId = e.target.closest('.bucket').id;
        setTargetObj(() => { return { bucketId, } });
        console.log(bucketId)
    }
    const closeDialog = () => {
        setOpenDialog(false);
        setDialogData({});
    }
    const editCardHandler = (e) => {
        setOpenDialog(true);
        setDialogMode('edit');
        setDialogType('card');
        let bucketId = e.target.closest('.bucket').id;
        let cardId = e.target.closest('.card').id;
        let title = board.find(bucket => bucket.id === bucketId).cards.find(card => card.id === cardId).title;
        let videoLink = board.find(bucket => bucket.id === bucketId).cards.find(card => card.id === cardId).videoLink;
        setTargetObj(() => { return { bucketId, cardId } });
        setDialogData(() => { return { name: title, link: videoLink } });
    }
    const saveData = async (payload, mode, type) => {
        // mode : edit / create
        // type: card / bucket
        if (mode === 'edit') {
            if (type === 'card') {
                // link, name
                const bucketClone = await JSON.parse(JSON.stringify(board.find(bucket => bucket.id === targetObj.bucketId)));
                bucketClone.cards.forEach(card => {
                    if (card.id === targetObj.cardId) {
                        card.title = payload.title;
                        card.videoLink = payload.link;
                    }
                });
                setBoard(() => board.map(bucket => {
                    if (bucket.id === targetObj.bucketId)
                        return bucketClone;
                    else return bucket;
                }))
            }
            else {
                const bucketClone = await JSON.parse(JSON.stringify(board.find(bucket => bucket.id === targetObj.bucketId)));
                console.log(bucketClone)
                console.log(payload)
                bucketClone.title = payload.title;
                setBoard(() => {
                    return board.map(bucket => (bucket.id === targetObj.bucketId) ? bucketClone : bucket);

                })
            }
        }
        else {
            if (type === 'card') {
                const bucketClone = await JSON.parse(JSON.stringify(board.find(bucket => bucket.id === targetObj.bucketId)));
                const newCard = {};
                newCard.id = uuidv4();
                newCard.title = payload.title;
                newCard.videoLink = payload.link;
                bucketClone.cards.push(newCard);
                setBoard(() => board.map(bucket => (bucket.id === targetObj.bucketId) ? bucketClone : bucket));
            }
            else {
                const BoardClone = JSON.parse(JSON.stringify(board));
                const newBucket = {};
                newBucket.id = uuidv4();
                newBucket.title = payload.title;
                newBucket.cards = [];
                BoardClone.push(newBucket);
                setBoard(() => BoardClone);
            }
        }
        setOpenDialog(false);
        setDialogData({});
    }

    const editBucketHandler = (e) => {
        setOpenDialog(true);
        setDialogMode('edit');
        setDialogType('bucket');
        let bucketId = e.target.closest('.bucket').id;
        console.log(bucketId);
        let title = board.find(bucket => bucket.id === bucketId).title;
        setTargetObj(() => { return { bucketId, } });
        setDialogData(() => { return { name: title } });

    }
    const deleteCardHandler = async (e) => {
        let bucketId = e.target.closest('.bucket').id;
        let cardId = e.target.closest('.card').id;
        let bucketIndex = board.findIndex(bucket => bucket.id === bucketId);
        const bucket = await JSON.parse(JSON.stringify(board[bucketIndex]))

        bucket.cards = bucket.cards.filter(card => card.id !== cardId)
        setBoard(() => board.map(item => {
            if (item.id === bucket.id) {
                return bucket;
            }
            else {
                return item;
            }
        }
        )
        )
    }

    const deleteBucketHandler = async (e) => {
        if (confirm("⚠ Do you Really want to delete this bucket?")) {
            let bucketId = e.target.closest('.bucket').id;
            const bucketClone = await JSON.parse(JSON.stringify(board.find(item => item.id === bucketId)));
            setBoard(() => board.filter(item => {
                if (item.id === bucketId) {

                    return false;
                }
                else {
                    return true;
                }
            }))
        }

    }
    return (
        <>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>
                    Kanban Board <span className='glow-icon'>📅 🚀</span>
                </h1>
                <div className='add-bucket btn' onClick={createBucketHandler}>➕ Create New Bucket</div>
            </div>
            <div className="board">
                <DragDropContext onDragEnd={onDragEnd}>
                    {board.map(bucket => (
                        <Droppable droppableId={bucket.id} key={bucket.id}>{
                            (provided) => (
                                <div className="bucket" id={bucket.id}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    <div className="bucket__title">{bucket.title}</div>

                                    <div className='control_btn edit' onClick={editBucketHandler}>
                                        <img src={edit} alt="edit" />
                                    </div>
                                    <div className='control_btn delete' onClick={deleteBucketHandler}>
                                        <img src={trash} alt="delete" />
                                    </div>
                                    <div className="bucket__content">
                                        {bucket.cards.map((card, index) => (
                                            <Draggable key={card.id} index={index}
                                                draggableId={card.id}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            opacity: snapshot.isDragging ? '0.5' : '1'
                                                        }}
                                                    >
                                                        <Card cardId={card.id}>
                                                            <h3 className="card__title">{card.title}</h3>
                                                            <h4><a href={card.videoLink} target="_blank">Link</a>
                                                            </h4>
                                                            <div style={{ display: 'flex' }}>
                                                                <button onClick={editCardHandler}>✍ Edit</button>
                                                                <button onClick={deleteCardHandler}>Delete</button>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                        )}
                                        {provided.placeholder}
                                    </div>
                                    <div onClick={createCardHandler} className="add-card btn">➕ Create New Card </div>
                                </div>
                            )
                        }
                        </Droppable>
                    )
                    )}

                </DragDropContext>
                <div className={`overlay ${openDialog ? 'active' : ''}`} onClick={closeDialog}></div>
                {openDialog ? <Dialog link={dialogData.link ? dialogData.link : ''}
                    name={dialogData.name ? dialogData.name : ''}
                    closeDialog={closeDialog} dialogType={dialogType}
                    active={openDialog} dialogMode={dialogMode} saveData={saveData} /> : <></>}
            </div>
        </>
    )
}

export default Board;