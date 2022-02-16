import { dbService, doc, deleteDoc, updateDoc } from "fBase";
import React, { useState } from "react";


const Nweet = ({nweetObj, isOwner})=>{
    // States
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    // when delete button clicked
    const onDeleteClick = async () =>{
        const ok = window.confirm("Are you sure to delete your this nweet ?");
        // ok버튼이 눌렸을때 (delte nweet)
        if(ok){
            // doc으로 레퍼런스를 만들고 이를 deleteDoc으로 삭제하는 방식이다.
            const docRef = await doc(dbService, `nweets/${nweetObj.id}`);
            deleteDoc(docRef);
        }
    }
    // when editing button pressed
    const toggleEditing = () => setEditing((prev) => !prev);
    // when submit button pressed
    const onSubmit = async (event) => {
        event.preventDefault();
        // editing
        const docRef = doc(dbService, `nweets/${nweetObj.id}`);
        await updateDoc(docRef, {text : newNweet});
        // close edit input
        setEditing(false);
    };
    // when input changed
    const onChange = (event)=>{
        const {target : {value},} = event;
        setNewNweet(value);
    };
    return (
        <div id={nweetObj.id}>
            {
                editing ? 
                ( 
                <>
                    {/* 계정 소유주가 아니면 에딧창자체를 못키게함. */}
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                                <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange} />
                                <input type="submit" value="update Nweet"></input>
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </>
                    )}
                </>
                ) : (
                <>
                    <h4>{nweetObj.text} <small>[{new Date().toDateString(nweetObj.createdAt)}]</small></h4>
                    {isOwner && (
                        // 2개이상의 태그가 사용될떄는 프래그먼트(<></>)를 사용하여 묶어줘야한다.
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </> 
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;