export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

export function receiveCards (cards) {
    return {
        type: RECEIVE_CARDS,
        cards,
    }
}

export function addCard (title, newCards) {
    return {
        type: ADD_CARD,
        title,
        newCards,
    }
}

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function removeDeck (title) {
    return {
        type: REMOVE_DECK,
        title
    }
}