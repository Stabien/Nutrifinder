export default productFiltersReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT_FILTERS':
      return action.productFilters;
    default:
      return state;
  }
}
