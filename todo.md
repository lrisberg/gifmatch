index.js:

-make idiomatic redux
-use connect (react-redux) instead of store.subscribe(render)

-board.jsx
move more state to redux
reading list: timeout - stack overflow on redux-thunk (async in redux) (use connect first)



order:
-move state into store (all of it)
-move types into action creators (read docs)
-replace global store subscribe with global connect component
-restructure code to use multiple connects if necessary
  -move business logic into a thunk/saga (hardest one)
-reselect to efficiently pull out functions from connect
-redux middleware (logging - on every action, log out what it was)
