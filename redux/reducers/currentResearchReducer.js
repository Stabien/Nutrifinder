export default currentResearchReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_RESEARCH':
      return action.currentResearch;
    default:
      return state;
  }
}
