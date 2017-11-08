// action types

export const SELECT_GIF = 'SELECT_GIF';
export const STOP_WAITING = 'STOP_WAITING';

// action creators

export function selectGif(key, gif, stopWaitingFunc) {
  return {
    type: SELECT_GIF,
    key,
    gif,
    stopWaitingFunc
  };
}



// export function selectGif(key, gif) {
//   return function thunk(dispatch, getState) {
//
//     if (getState().waiting) {
//       return;
//     }
//
//     // const intervalId = setInterval(function() {
//     //   if (getState().timer > 1000) {
//     //     clearInterval(intervalId);
//     //     return // canvel interval
//     //   }
//     //
//     //   dispatch({ type: "CLOCK_TICK" })
//     // }, 1000)
//   }
// }

export function stopWaiting(key1, key2) {
  return {
    type: STOP_WAITING,
    key1,
    key2
  };
}
