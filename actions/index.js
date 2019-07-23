export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';

export function receiveCards (cards) {
    return {
        type: RECEIVE_CARDS,
        cards,
    }
}

export function addCard (title, card) {
    return {
        type: ADD_CARD,
        title,
        card,
    }
}

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title
    }
}