/**
 * @param tableId {string}
 * @param readFn {(a: HTMLTableRowElement) => string}
 * @param compareFn {(a: string, b: string) => number}
 */
function sortTable(tableId, readFn, compareFn) {
    console.debug("Sorting table `", tableId , "` with ", readFn, " and ", compareFn)

    /**
     * @type {HTMLTableElement | undefined}
     */
    const table = document.getElementById(tableId)

    if(!table) {
        console.error("Table `", tableId, "` not found")
        return
    }

    /**
     * @type {HTMLTableSectionElement | undefined}
     */
    const tbody = table.tBodies[0]

    if(!tbody) {
        console.error("Table body of`", tableId, "` not found")
        return
    }

    /**
     * @type {HTMLTableRowElement[]}
     */
    const allRows = [...tbody.rows]
    const undefinedRows = []

    for(const row of allRows) {
        if(readFn(row) === undefined) {
            undefinedRows.push(row)
        }
    }

    const definedRows = allRows.filter(row => readFn(row) !== undefined)
    const sortedRows = definedRows.toSorted((a, b) => compareFn(readFn(a), readFn(b)))

    let reverse = true
    for(let idx = 0; idx < sortedRows.length; idx++) {
        if(definedRows[idx] !== sortedRows[idx]) {
            reverse = false
            break
        }
    }

    if(reverse) {
        sortedRows.reverse()
    }

    const resultRows = sortedRows.concat(undefinedRows)

    while(tbody.rows.length > 0) {
        tbody.deleteRow(0)
    }

    for(const row of resultRows) {
        tbody.appendChild(row)
    }
}

/**
 * @param a {HTMLTableRowElement}
 */
function readNameSort(a) {
    for(const cell of a.cells) {
        if(cell.classList.contains("review-namesort")) {
            const value = cell.firstElementChild.value
            if(value === "") return undefined
            return value
        }
    }
}

/**
 * @param a {HTMLTableRowElement}
 */
function readRating(a) {
    for(const cell of a.cells) {
        if(cell.classList.contains("review-rating")) {
            const value = cell.firstElementChild.value
            if(value === "") return undefined
            return Number.parseInt(value)
        }
    }
}

/**
 * @param a {HTMLTableRowElement}
 */
function readHoursPlayed(a) {
    for(const cell of a.cells) {
        if(cell.classList.contains("game-hoursplayed")) {
            const value = cell.firstElementChild.value
            if(value === "0") return undefined
            return Number.parseInt(value)
        }
    }
}

/**
 * @param a {HTMLTableRowElement}
 */
function readDate(a) {
    for(const cell of a.cells) {
        if(cell.classList.contains("review-date")) {
            const value = cell.firstElementChild.dateTime
            if(value === "") return undefined
            return new Date(value)
        }
    }
}

/**
 * @param a {HTMLTableRowElement}
 */
function readHasContent(a) {
    for(const cell of a.cells) {
        if(cell.classList.contains("review-hascontent")) {
            const value = cell.firstElementChild.value
            return value === "true"
        }
    }
}

/**
 * @param a {HTMLTableRowElement}
 */
function readProgress(a) {
    for(const cell of a.cells) {
        if(cell.classList.contains("game-progress")) {
            /**
             * @type {HTMLDataElement}
             */
            const data = cell.firstElementChild
            switch (data.value) {
                case undefined:
                    return undefined;
                case "unset":
                    return undefined;
                case "notapplicable":
                    return 5;
                case "new":
                    return 10;
                case "started":
                    return 20;
                case "beaten":
                    return 30;
                case "completed":
                    return 40;
                case "mastered":
                    return 50;
            }
        }
    }
}

/**
 * @param tableId {string}
 */
function installSort(tableId) {
    console.debug("Installing sorting capabilities on `", tableId, "`...")

    /**
     * @type {HTMLTableElement | undefined}
     */
    const table = document.getElementById(tableId)

    if(!table) {
        console.error("Table `", tableId, "` not found")
        return
    }

    /**
     * @type {HTMLTableSectionElement | undefined}
     */
    const thead = table.tHead

    if(!thead) {
        console.error("Table header of `", tableId, "` not found")
        return
    }

    /**
     * @type {HTMLTableRowElement | undefined}
     */
    const thRow = thead.rows[0]

    if(!thRow) {
        console.error("Table header of `", tableId, "` not found")
        return
    }

    for(const cell of thRow.cells) {
        if(cell.classList.contains("review-name")) {
            cell.onclick = function() {
                sortTable(tableId, readNameSort, (a, b) => a.localeCompare(b))
            }
            cell.classList.add("sortable")
        }
        else if(cell.classList.contains("review-rating")) {
            cell.onclick = function() {
                sortTable(tableId, readRating, (a, b) => b - a)
            }
            cell.classList.add("sortable")
        }
        else if(cell.classList.contains("review-date")) {
            cell.onclick = function() {
                sortTable(tableId, readDate, (a, b) => b - a)
            }
            cell.classList.add("sortable")
        }
        else if(cell.classList.contains("game-hoursplayed")) {
            cell.onclick = function() {
                sortTable(tableId, readHoursPlayed, (a, b) => b - a)
            }
            cell.classList.add("sortable")
        }
        else if(cell.classList.contains("review-hascontent")) {
            cell.onclick = function() {
                sortTable(tableId, readHasContent, (a, b) => b - a)
            }
            cell.classList.add("sortable")
        }
        else if(cell.classList.contains("game-progress")) {
            cell.onclick = function() {
                sortTable(tableId, readProgress, (a, b) => b - a)
            }
            cell.classList.add("sortable")
        }
    }
}