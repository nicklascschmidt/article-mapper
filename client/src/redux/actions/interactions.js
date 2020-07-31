import * as T from './actionTypes';

const overwriteInteractionsField = (field, data) => ({
  type: T.OVERWRITE_INTERACTIONS_FIELD,
  payload: {
    field,
    value: data,
  },
});

export const overwriteActiveAction = (data) => overwriteInteractionsField('activeAction', data);

export const overwriteOpenMarkerId = (data) => overwriteInteractionsField('openMarkerId', data);
