import { AsyncStorage } from 'react-native';
import { CARDS_STORAGE_KEY, formatCards } from './_DATA';

export function fetchCardsResults () {
    // AsyncStorage.clear();
    return AsyncStorage.getItem(CARDS_STORAGE_KEY)
        .then(formatCards)
}

export function submitDeck ( title ) {
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        },
    }))
}

export function submitCard ( title, cards ) {

    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            ...cards,
        },
    }))
}

export function testFetchCards () {
    return AsyncStorage.getItem(CARDS_STORAGE_KEY)
}

export function clearAll(){
    return AsyncStorage.clear();
}