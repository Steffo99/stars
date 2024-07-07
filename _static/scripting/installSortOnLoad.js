window.onload = function() {
    const tableId = document.querySelector("table").id
    installSort(tableId)
    sortTable(tableId, readRating, (a, b) => b - a)
}
