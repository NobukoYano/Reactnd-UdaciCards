import { AsyncStorage } from 'react-native';
import { CARDS_STORAGE_KEY, formatCards } from './_DATA';

export function fetchCardsResults () {
    AsyncStorage.clear();
    return AsyncStorage.getItem(CARDS_STORAGE_KEY)
        .then(formatCards)
}
