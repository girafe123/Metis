import { fork } from 'redux-saga/effects';
import { saga as docListPanelSaga } from '../docListPanel';
import { saga as docPanelSaga } from '../docPanel';
import { saga as folderPanelSaga } from '../folderPanel';
import { saga as recycleBinSaga } from '../recycleBin';

export default function* rootSaga() {
  yield fork(docListPanelSaga);
  yield fork(docPanelSaga);
  yield fork(folderPanelSaga);
  yield fork(recycleBinSaga);
}
