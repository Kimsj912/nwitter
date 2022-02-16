import { dbService, addDoc, getDocs, setDoc, collection,query} from "fBase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(()=>{
        getNweets();
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
                    nweet,
                    createdAt : Date.now(),
                }
            );
            console.log("Doc ID : ", docRef.id);
        } catch(error){
            console.log("Error adding Document : ", error);
        }
        setNweet("");
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
                    <div id={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>)}
            </div>
        </div>
    );
};
export default Home;