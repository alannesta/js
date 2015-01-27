function Calendar(options) {
    var self = this;
    var momentNow = moment();
    var startCell = null, endCell = null, dragging = false;   // drag and drop local variables
    var dayMap = {
        0: 'SUN',
        1: 'MON',
        2: 'TUE',
        3: 'WED',
        4: 'THU',
        5: 'FRI',
        6: 'SAT'
    };

    var defaults = {
        date: momentNow.startOf('month').toDate(),
        currentSelection: momentNow.toDate(),
        parentEl: $(document.body),
        selectionMode: 0
    }

    var calendarSettings = _normalizeOptions(options);

    this.selectionMode = calendarSettings.selectionMode;     // 0: single, 1: date-range
    this.date = calendarSettings.date;
    this.currentSelection = (this.date.getMonth() === calendarSettings.currentSelection.getMonth() ? calendarSettings.currentSelection : null);
    this.currentRangeSelection = [];
    this.view = null;
    this.parentEl = calendarSettings.parentEl;
    this.uid = parseInt(Math.random() * 10000, 10);     //TODO: use uuid generator
    this.rangeSelection = {
        start: null,
        end: null
    };

    this.render = function() {
        this.view = $(generateHTML(this.date));
        _restoreSelection();
        // this.currentSelection = _getSingleSelection();
        // _updateSingleSelection({currentSelection: this.currentSelection});
        this.parentEl.append(this.view);
    }

    this.reRender = function() {
        this.parentEl.empty();
        this.render();
        this.trigger(this.uid + '_update');
    }

    this.bindHandlers = function() {

        // drag to select date (range)
        self.view.find('tbody').on('mousedown mouseup mousemove', _handleDrag);

        // click to select date (single/range)
        self.view.find('tbody td').on('click', function handleClick(e) {
            var target = e.target;

            if (!_isDisabled(target)) {
                if (self.selectionMode === 0) {
                    self.currentSelection = _getDateFromCellText(target.innerText);
                    self.trigger(self.uid + '_selectSingleDate', {currentSelection: self.currentSelection});
                } else if (self.selectionMode === 1) {
                    var stage = _checkSelectionStage();
                    var selectedDate = _getDateFromCellText(target.innerText);
                    _updateRangeSelectionValue(stage, selectedDate);
                    self.trigger(self.uid + '_selectDateRange', {
                        rangeSelection: self.rangeSelection,
                        stage: stage
                    });
                }
            }
        });

        // hover effect
        self.view.find('tbody td').on('hover', function handleHover(e) {
            var target = e.target;
            if (!_isDisabled(target)) {
                $(target).toggleClass('hover');
            }
        });
    }

    // These listners should only handle view updates and bind handlers
    this.bindListeners = function() {
        self.on(self.uid + '_setdate', function() {
            self.reRender();
            self.bindHandlers();
        });

        /*
         @param: selection: {cell: HTMLElement}
         */
        self.on(self.uid + '_selectSingleDate', function(e, selection) {
            _updateSingleSelection(selection);
        });

        self.on(self.uid + '_selectDateRange', function(e, rangeSelection) {
            _updateRangeSelection(rangeSelection);
        });

        self.on(self.uid + '_dragSelectEnd', function(e, rangeSelection) {
            _cacheRangeSelection({rangeSelection: {start: rangeSelection.start, end: rangeSelection.end}});
        });

    }

    /*
     Initialization
     */

    function init() {
        self.render();
        self.bindHandlers();
        self.bindListeners();
    }

    function _normalizeOptions(options) {
        return $.extend(defaults, options);
    }

    /*
     HTML generation
     */
    function generateHTML(date) {
        // console.log(date.getDay()); // 0-6, Sunday is 0
        var headerHtml = '<div>' + moment(date).format('YYYY-MM') + '</div>'
        var tableHtml = headerHtml + '<table><thead><tr>';
        for (var i = 0; i < 7; i++) {
            tableHtml += '<td>' + dayMap[i] + '</td>';
        }
        tableHtml += '</tr></thead>';

        var tbodyHtml = '<tbody><tr>';
        var current = 1;
        // var startDay = date.getDay();
        var currentMonth = date.getMonth();
        var currentYear = date.getFullYear();
        var previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        var previousYear = previousMonth === 11 ? currentYear - 1 : currentYear;
        var previousMonthDays = _daysInMonth(previousMonth, previousYear);
        var currentMonthDays = _daysInMonth(currentMonth, currentYear);

        var startDay = date.getDay();
        var endDay = moment(date).endOf('month').toDate().getDay();
        var nextStartDay = moment(date).add(1, 'months').toDate().getDay();

        var rowCount = _countRows(7 - startDay, currentMonthDays);
        // console.log(rowCount);

        // render the first row
        var previous = previousMonthDays - startDay + 1;
        for (var k = 0; k < startDay; k++) {
            tbodyHtml += '<td class="disabled">' + (previous++) + '</td>';
        }
        for (var j = startDay; j < 7; j++) {
            tbodyHtml += '<td>' + (current++) + '</td>';
        }
        tbodyHtml += '</tr>';

        // render the rows in the middle
        for (var row = 1; row < rowCount - 1; row++) {
            tbodyHtml += '<tr>';
            for (var column = 0; column < 7; column++) {
                tbodyHtml += _createCell(current++);
            }
            tbodyHtml += '</tr><tr>';
        }

        // render the last row
        for (; current < currentMonthDays + 1; current++) {
            tbodyHtml += '<td>' + current + '</td>';
        }

        // need to fill in the blanks with days in next month
        if (endDay !== 6) {
            for (var m = nextStartDay, temp = 1; m < 7; m++, temp++) {
                tbodyHtml += '<td class="disabled">' + temp + '</td>';
            }
        }

        // close tags
        tbodyHtml += '</tr></tbody>';
        tableHtml += tbodyHtml + '</table>';

        return tableHtml;
    }

    function _createCell(innerText) {
        return '<td>' + innerText + '</td>';
    }

    function _countRows(firstRow, total) {
        return total - 28 > firstRow ? 6 : 5;
    }

    function _isDisabled(htmlElement) {
        return $(htmlElement).hasClass('disabled');
    }

    /*
     Date manipulation
     */
    function _daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    // return an array of dates between the start(included) and end date(included)
    function _getDatesArray(startDate, endDate) {
        var start = startDate, end = endDate;
        var results = [];
        // swap if startDate is later than endDate
        if (startDate > endDate) {
            start = endDate;
            end = startDate;
        }
        while (start <= end) {
            results.push(start);
            start = moment(start).add(1, 'days').toDate();
        }
        return results;
    }

    /*
     Selection Management
     */

    function _getDateFromCellText(cellText) {
        return new Date(self.date.getFullYear(), self.date.getMonth(), cellText);
    }

    function _updateSingleSelection(options) {
        var dateNum;

        if (options.currentSelection) {
            // check if the same month and year as the current calendar date
            if (options.currentSelection.getMonth() === self.date.getMonth() && options.currentSelection.getFullYear() === self.date.getFullYear()) {
                dateNum = options.currentSelection.getDate();
            }
        } else {
            return;
        }
        self.view.find('.selected').removeClass('selected');
        self.view.find('tbody td').each(function(index, item) {
            if (item.innerText == dateNum && !_isDisabled(item)) {
                $(item).addClass('selected');
                // break;
            }
        });
        _cacheSingleSelection(options.currentSelection);   // date cache
    }

    function _updateRangeSelection(options) {
        var startDate = options.rangeSelection.start;
        var endDate = options.rangeSelection.end;
        var stage = options.stage;
        var allDates = [];
        // check if the same month and year as the current calendar date
        if ((startDate.getMonth() === self.date.getMonth() && startDate.getFullYear() === self.date.getFullYear()) || (endDate.getMonth() === self.date.getMonth() && endDate.getFullYear() === self.date.getFullYear())) {

            // status 1: range selection complete (both start and end are selected)
            if (stage === 'end' && startDate && endDate) {
                allDates = _getDatesArray(startDate, endDate);
                // debugger;
                _cacheRangeSelection({rangeSelection: options.rangeSelection});   // range date cache
                _renderMultipleSelectedCells(allDates);
            }
            //status 2: start date selection complete
            if (stage === 'start') {
                self.rangeSelection.end = null; // set the end date to null;
                _updateSingleSelection({currentSelection: self.rangeSelection.start});
            }

            // while dragging, do not cache the result
            if (stage === 'drag') {
                allDates = _getDatesArray(startDate, endDate);
                _renderMultipleSelectedCells(allDates);
            }
        }
    }

    function _renderMultipleSelectedCells(datesArr) {
        var currentMonth = self.date.getMonth();
        var currentYear = self.date.getFullYear();
        var filtered = datesArr.filter(function(date) {
            return (date <= new Date(currentYear, currentMonth + 1, 0)) && (date >= new Date(currentYear, currentMonth, 1));
        });

        self.view.find('.selected').removeClass('selected');

        self.view.find('tbody td').each(function(index, item) {
            if (item.innerText >= filtered[0].getDate() && item.innerText <= filtered[filtered.length - 1].getDate() && !_isDisabled(item)) {
                $(item).addClass('selected');
                // break;
            }
        });
    }


    // call the _updateRangeSelection() to render the view when dragging
    function _renderDragCells(start, current) {
        // debugger;
        var startDate = _getDateFromCellText(start.innerText);
        var currentDate = _getDateFromCellText(current.innerText);
        _updateRangeSelection({
            rangeSelection: {
                start: startDate,
                end: currentDate
            },
            stage: 'drag'
        })
    }


    function _checkSelectionStage() {
        // debugger;
        return self.rangeSelection.start ? (self.rangeSelection.end ? 'start' : 'end') : 'start';
    }

    function _updateRangeSelectionValue(stage, date) {
        self.rangeSelection[stage] = date;
    }

    function _handleDrag(e) {

        switch (e.type) {
            case 'mousedown':
                if (startCell === null) {
                    startCell = e.target;
                    dragging = true;
                }
                break;
            case 'mousemove':
                // case: no drag is in progress, should do nothing
                if (!dragging) {
                    return;
                }
                // case: start cell selected, end cell is yet to be decided
                if (startCell && endCell === null) {
                    _renderDragCells(startCell, e.target);
                }
                break;
            case 'mouseup':
                if (startCell && endCell === null) {

                    endCell = e.target;
                    endDate = _getDateFromCellText(endCell.innerText);
                    startDate = _getDateFromCellText(startCell.innerText);

                    self.trigger(self.uid + '_dragSelectEnd', {start: startDate, end: endDate});
                    dragging = false;
                    startCell = null;
                    endCell = null;
                }
                break;
        }
    }


    /*
     Data caching
     */
    function _restoreSelection() {
        var cached;
        if (self.selectionMode === 0) {
            cached = _getSingleSelection();
            if (cached) {
                self.currentSelection = cached;
                _updateSingleSelection({currentSelection: self.currentSelection});
            }
        } else if (self.selectionMode === 1) {
            cached = _getRangeSelection();
            if (cached) {
                self.rangeSelection = cached;
                _updateRangeSelection({rangeSelection: self.rangeSelection, stage: 'end'});
            }
        }

    }

    // cache data on parentEl node
    function _cacheSingleSelection(date) {
        $.data(self.parentEl, self.uid + '_singleDateSelection', date);
    }

    function _cacheRangeSelection(rangeSelection) {
        $.data(self.parentEl, self.uid + '_rangeDateSelection', rangeSelection.rangeSelection);
    }

    function _getSingleSelection() {
        return $.data(self.parentEl, self.uid + '_singleDateSelection');
    }

    function _getRangeSelection() {
        return $.data(self.parentEl, self.uid + '_rangeDateSelection');
    }

    init();
}


Calendar.prototype.setDate = function(date) {
    this.date = date;
    this.trigger(this.uid + '_setdate');
}

Calendar.prototype.getDate = function(date) {
    return this.date;
}

Calendar.prototype.next = function() {
    var nextMonth = moment(this.date).add(1, 'months').toDate();
    this.navigateTo(nextMonth);
}

Calendar.prototype.previous = function() {
    var previousMonth = moment(this.date).subtract(1, 'months').toDate();
    this.navigateTo(previousMonth);
}

Calendar.prototype.navigateTo = function(date) {
    this.setDate(date);
}

Calendar.prototype.getView = function() {
    return this.view;
}

Calendar.prototype.getCurrentSelection = function() {
    return this.currentSelection;
}

// pub/sub
Calendar.prototype.events = $({});

Calendar.prototype.trigger = function(eventName) {
    // $.publish(eventName);
    this.events.trigger.apply(this.events, arguments);
}

Calendar.prototype.on = function(eventName, callback) {
    // $.subscribe(eventName, callback);
    this.events.on.apply(this.events, arguments);
}