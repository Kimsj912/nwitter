import { dbService, addDoc, getDocs, collection,query,orderBy, onSnapshot} from "fBase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(()=>{
        // getNweets();
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc"),
        );
        onSnapshot(q,(snapShot) =>{
            const nweetArr = snapShot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);
    const getNweets = async (event) =>{
        const dbNweets = await getDocs(query(collection(dbService,"nweets")));
        dbNweets.forEach((doc) => {
            const nweetObject = {
                ...doc.data(),
                id:doc.id,
            }
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    const onSubmit = async function (event) {
        event.preventDefault();
        ////////////////////////////////////////////// 여기 고치던중. 3.1의 4분 53초
        try{
            const docRef = await addDoc(
                collection(dbService, "nweets"),
                {
                    text: nweet,
                    createdAt : Date.now(),
                    creatorId : userObj.uid,
                }
            );
            setNweet("");
        } catch(error){
            console.log("Error adding Document : ", error);
        }
    };
    const onChange=(event)=>{
        const {
            target : {value},
        } = event;
        setNweet(value); 
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet => 
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}/>
                )}
            </div>
        </div>
    );
};
export default Home;