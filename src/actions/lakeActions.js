import * as types from './actionTypes';

export function loadLakeSuccess(lakes) {
    return { type: types.LOAD_LAKES_SUCCESS, lakes};
}

