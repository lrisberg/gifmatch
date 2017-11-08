index.js:

-make idiomatic redux
-use connect (react-redux) instead of store.subscribe(render)

-board.jsx
move more state to redux
reading list: timeout - stack overflow on redux-thunk (async in redux) (use connect first)



order:
[x] move state into store (all of it)
[x] move types into action creators (read docs)
[ ] replace global store subscribe with global connect component
[ ] restructure code to use multiple connects if necessary
[ ] move business logic into a thunk/saga (hardest one)
[ ] reselect to efficiently pull out functions from connect
[ ] redux middleware (logging - on every action, log out what it was)



-business logic in reducer is sucky
-check out thunk and saga
-rather than have reducer have business logic, run all asyc stuff in async actions
-action becomes a function (Rather than object)
-pros and cons to thunk and saga

move game logic to a thunk (install new package, install into store middleware)

move logic into a thunk; update state using the arguments

also get the hang of sagas - let's build a game counter using a saga (but not until we meet up after a thunk)
