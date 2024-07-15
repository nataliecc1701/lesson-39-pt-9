import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './cardTable.css'

const apiBaseString = "https://deckofcardsapi.com/api/"

const CardTable = () => {
    const [cards, setCards] = useState([]);
    const [deckId, setDeckId] = useState();
    
    const callApi = async function(target) {
        try {
            const res = await axios.get(`${apiBaseString}/${target}`);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return {success: false};
        }
    }
    
    useEffect(() => {
        async function makeDeck() {
            const res = await callApi('deck/new/shuffle/');
            if (res.success) {
                setDeckId(res.deck_id);
            }
        }
        makeDeck()
    }, []);
    
    const drawCard = async function() {
        try {
            const res = await callApi(`deck/${deckId}/draw`);
            setCards([...cards, ...res.cards]);
        }
        catch (err) {
            alert("service error, see console");
            console.log(err);
        }
    }
    
    return (<>
        <button onClick={drawCard} className={"CardTable-DrawButton"}>Draw a Card</button>
        {cards.map(c => <Card imgSrc={c.image} key={c.code} />)}
    </>)
}

export default CardTable