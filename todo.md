index.js:

-make idiomatic redux
-use connect (react-redux) instead of store.subscribe(render)

-board.jsx
move more state to redux
reading list: timeout - stack overflow on redux-thunk (async in redux) (use connect first)



order:
[x] move state into store (all of it)
[x] move types into action creators (read docs)
[x] replace global store subscribe with global connect component
[x] restructure code to use multiple connects if necessary
[x] move business logic into a thunk/saga (hardest one)
[ ] reselect to efficiently pull out functions from connect
[ ] redux middleware (logging - on every action, log out what it was)



-business logic in reducer is sucky
-check out thunk and saga
-rather than have reducer have business logic, run all async stuff in async actions
-action becomes a function (Rather than object)
-pros and cons to thunk and saga

move game logic to a thunk (install new package, install into store middleware)

move logic into a thunk; update state using the arguments

also get the hang of sagas - let's build a game counter using a saga (but not until we meet up after a thunk)



-add feature to reset board (remove all the current state, generate a new board with a different size) and change dimensions

-specify dimension - when you click and submit, reset everything and update to that size

-this is a good use case for reselect

-let's worry about just preventing updates first

shouldComponentUpdate(board) - I'm only gonna rerender if my board changes
 - we also don't want to update if misses changes, so pull this out into its own component/connect

-move most of the connection to Tile; might need reselect
-we really just need dispatch on the tiles
move onSelectTile to the tile. Use ownProps to curry the dispatch
-board just renders numbers
-tile is connected to all the logic

1. Pull misses into its own component (connect it by itself; get props from store)
2. Connect the board and tiles independently. Board only takes the count(dimensions). Ideally this component shouldn't know anything except the size of the board (also use the 'times' method in lodash; iterates over an array)
3. Tile can be smart enough to know what a click means



much later: recompose
