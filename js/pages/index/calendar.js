(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Calendar = factory());
}(this, (function () {
  'use strict';

function noop() {}

function extend(to, _from) {
  for (var key in _from) {
    _from[key] !== undefined && (to[key] = _from[key]);
  }
  return to;
}

function zeroPadding(_num) {
  var num = +_num;
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

function isLeapYear(year) {
  return !(year % (year % 100 ? 4 : 400));
}

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @returns {String}
 */
var getWeek = function getWeek(dateString){
    var date;
    if(dateString == null || typeof dateString == "undefined"){
        date = new Date();
    }else{
        var dateArray = dateString.split("-");
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
    //return "星期" + weeks[date.getDay()];
    return "周" + "日一二三四五六".charAt(date.getDay());
};

var getCurTime = function getCurTime(_date) {
  var date = _date || new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
};

function format$1(date, fmt) {
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  };
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length));
      } else if (k === 'S+') {
        var lens = RegExp.$1.length;
        lens = lens === 1 ? 3 : lens;
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens));
      } else {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
  }
  return fmt;
}

var header = function header() {
  return '<ul class="calendar-bar"><li>\u65E5</li><li>\u4E00</li><li>\u4E8C</li><li>\u4E09</li><li>\u56DB</li><li>\u4E94</li><li>\u516D</li></ul>';
};

var monthTitle = function monthTitle(title) {
  return '<h1 class="calendar-title">' + title + '</h1>';
};

var dayItem = function dayItem(type, text) {
  var remark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  if (!text) return '<li class="' + type + '"></li>';
  return '<li data-index="' + index + '" data-date="' + value + '" class="' + type + '"><span class="calendar-text">' + text + '</span><span class="calendar-remark">' + remark + '</span></li>';
};

var daySelect = function daySelect(day, type, typeText) {
  return '<div class="calendar-day-select select-' + type + '"><span class="day">' + day + '</span><span class="text">' + typeText + '</span><div class="elem-proxy"></div></div>';
};

var data = [];
var _getCurTime = getCurTime();
var year = _getCurTime.year;
var month = _getCurTime.month;
var day = _getCurTime.day;

function getEnd(_month) {
  var months = 12;
  var endMonth = month + _month;
  if (endMonth > months) {
    endMonth = months;
  }
  var endDay = data[endMonth - 1].days;
  return year + '-' + zeroPadding(endMonth) + '-' + zeroPadding(endDay);
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
}

    function getDefaultOptions() {
  return {
    el: document.body,
    data: [],
    years: [],
    travelType: 1,
    //start: year + '-' + zeroPadding(month) + '-' + zeroPadding(day),
    start: GetDateStr(0),
    //end: getEnd(3),
    end: GetDateStr(19),
    startCallback: noop,
    endCallback: noop,
    rtCallback: noop,
    setOutCallback: noop,
    selectDate: {},
    maxDays: false,
    maxCallback: noop
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Calendar = function () {
  function Calendar(options) {
    classCallCheck(this, Calendar);
    //console.log(options.data);
    data = options.data;
    this.options = extend(getDefaultOptions(), options);
    //console.log(options);
    //console.log(this.options);
    this.props = {
      holidayText: '休',
      workdayText: '班',
      startText: '去程',
      setOutText: '出发',
      rtText: '往/返',
      endText: '返程'
    };
    this.el = this.options.el;
    this.travelType = this.options.travelType;
    this.data = this.options.data;
    this.years = this.options.years;
    this.startDate = new Date(this.options.start);
    this.endDate = new Date(this.options.end);
    this.isMoving = false;
    this.touchStartTime = null;
    this.start = {};
    this.end = {};
    this.rt = {};
    this.setOut = {};
    this.selectDayElems = [];
  }

  createClass(Calendar, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var html = this.create();
      this.render(html);
      setTimeout(function () {
        _this.attachEvent();
        var _options$selectDate = _this.options.selectDate;
        var start = _options$selectDate.start;
        var rt = '';
        var end = '';
        if(_options$selectDate.start == _options$selectDate.end){
            rt = _options$selectDate.end;
        }else{
            end = _options$selectDate.end;
        }

        if (start && end) {
          _this.selectDate(start, end);
        }else if(start && rt){
            _this.selectDate(start, rt);
        }else if((start && !end) || (start && !rt)){
            _this.selectDate(start);
        }
      }, 10);
    }
  }, {
    key: 'create',
    value: function create() {
        //console.log(this);
      var months = this.createMonths();
      var haeder = header();
      return '\n      ' + haeder + '\n      <div class="calendar-items">\n        ' + months + '\n      </div>\n    ';
    }
  }, {
    key: 'createMonths',
    value: function createMonths() {
      var _this2 = this;
      var curYear = getCurTime().year;
      var startYear = this.startDate.getFullYear();
      var endYear = this.endDate.getFullYear();
      //console.log(startYear);
      //console.log(endYear);
      //console.log(this.data);
      //console.log(this.years);
      var startMonth = this.startDate.getMonth() + 1;
      var endMonth = this.endDate.getMonth() + 1;
      var months = [];
      // 遍历月期
      if(startYear == endYear){
          months = _this2.years[0].months.map(function (item, index) {
              var month = index + 1;
              if (!item.days || startMonth > month || endMonth < month) return '';
              // 标题
              var title = monthTitle(startYear + '\u5E74' + zeroPadding(month) + '\u6708');
              // 天
              var days = _this2.createDays(_this2.years[0].months,startYear, month);
              return '<section class="calendar-month">' + title + '<ul class="calendar-days">' + days + '</ul></section>';
          });
      }else{
          months = _this2.years[0].months.map(function (item, index) {
              var month = index + 1;
              if (!item.days || startMonth > month || 12 < month) return '';
              // 标题
              var title = monthTitle(startYear + '\u5E74' + zeroPadding(month) + '\u6708');
              // 天
              var days = _this2.createDays(_this2.years[0].months,startYear, month);
              return '<section class="calendar-month">' + title + '<ul class="calendar-days">' + days + '</ul></section>';
          });
          _this2.years[1].months.map(function (item, index) {
              var month = index + 1;
              if (!item.days || 1 > month || endMonth < month) return '';
              // 标题
              var title = monthTitle(endYear + '\u5E74' + zeroPadding(month) + '\u6708');
              // 天
              var days = _this2.createDays(_this2.years[1].months,endYear, month);
              months.push('<section class="calendar-month">' + title + '<ul class="calendar-days">' + days + '</ul></section>');
          });
      }

        // console.log(months);
        // console.log(months.join(''));

        return months.join('');




    }
  }, {
    key: 'createDays',
    value: function createDays(months,year, month) {
      // console.log(months);
      // console.log(year);
      // console.log(month);
      var startYear = this.startDate.getFullYear();
      var endYear = this.endDate.getFullYear();
      var date = new Date(year, month - 1, 1);
      var curMonthData = months[month - 1];
      var preDayCount = date.getDay();
      var isStartMonth = this.monthType('start', month);
      var isEndMonth = this.monthType('end', month);
      var preDayCounter = preDayCount;
      var days = [];
      // 记录每月开始前的补齐数量
      months[month - 1].preDayCount = preDayCount;
      // 补齐当前月开始前的日期
      while (preDayCounter-- > 0) {
        days.push(dayItem('disabled', '', ''));
      } // 当前日
      var day = 1;
      // 日期循环
      while (day <= curMonthData.days) {
        var value = year + '-' + zeroPadding(month) + '-' + zeroPadding(day);
        var type = this.dayType(months,year, month, day);
        // console.log(type);
        var text = curMonthData.fest[day] || day;
        // 禁用日期
        //   console.log(startYear);
        //   console.log(endYear);
        //   console.log(year);
        //   console.log(day);
        //   console.log(this.startDate.getDate());
        //   console.log(this.endDate.getDate());
        if(startYear == endYear){
            if (isStartMonth && day < this.startDate.getDate() || isEndMonth && day > this.endDate.getDate()) {
                type += ' disabled';
            } else if (this.isToday(year, month, day)) {
                type += ' today';
                text = '今天';
            }
        }else{
          if(year == startYear){
              if (isStartMonth && day < this.startDate.getDate()) {
                  type += ' disabled';
              } else if (this.isToday(year, month, day)) {
                  type += ' today';
                  text = '今天';
              }
          }else if(year == endYear){
              if (isEndMonth && day > this.endDate.getDate()) {
                  type += ' disabled';
              }
          }
        }
        var remark = this.isHoliday(months,month, day) ? this.props.holidayText : this.isWorkDay(months,month, day) ? this.props.workdayText : '';
        var index = day + preDayCount - 1;
        days.push(dayItem(type.trim(), text, remark, value, index));
        day++;
      }
      return days.join('');
    }
  }, {
    key: 'render',
    value: function render(html) {
      var content = document.createElement('div');
      content.className = 'calendar-content';
      content.innerHTML = html;
      this.contentEl = content;
      this.el.appendChild(content);
    }
  }, {
    key: 'attachEvent',
    value: function attachEvent() {
      this.contentEl.addEventListener('touchstart', this, false);
      this.contentEl.addEventListener('touchmove', this, false);
      this.contentEl.addEventListener('touchend', this, false);
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(e) {
      var calendar = this;
      switch (e.type) {
        case 'touchstart':
          calendar.touchstart(e);
          break;
        case 'touchmove':
          calendar.touchmove(e);
          break;
        case 'touchend':
          calendar.touchend(e);
          break;
      }
    }
  }, {
    key: 'touchstart',
    value: function touchstart(e) {
      this.touchStartTime = Date.now();
    }
  }, {
    key: 'touchmove',
    value: function touchmove(e) {
      // 置0防止拖动的时候选中日期
      this.touchStartTime = 0;
    }
  }, {
    key: 'touchend',
    value: function touchend(e) {
      var time = Date.now() - this.touchStartTime;
      if (time > 500) return;
      var targetEl = e.target;
      var targetAttr = targetEl.getAttribute('data-date');
      if (targetAttr) {
        this.chooseDay(targetEl, targetAttr);
      } else {
        var parent = Calendar.getParent(targetEl);
        var parentAttr = parent.getAttribute('data-date');
        if (parentAttr) {
          this.chooseDay(parent, parentAttr);
        } else {
          var dayElem = Calendar.getParent(parent);
          var dayAttr = dayElem.getAttribute('data-date');
          if (dayAttr) {
            this.chooseDay(dayElem, dayAttr);
          }
        }
      }
    }
  }, {
    key: 'chooseDay',
    value: function chooseDay(el, dateStr) {
      if (el.className.indexOf('disabled') !== -1) return;
      switch(this.travelType){
          case 1:
              // 已选择去程和返程，则重置状态
              if (this.start.html && this.end.html) {
                  this.reset();
              }
              var index = +el.getAttribute('data-index');
              var date = new Date(dateStr);
              var year = date.getFullYear();
              var month = date.getMonth() + 1;

              // var startYear = this.startDate.getFullYear();
              // var endYear = this.endDate.getFullYear();
              var startYear = new Date(this.start.date).getFullYear();
              var startMonth = parseInt(new Date(this.start.date).getMonth() + 1);
              var startIndex = this.start.index;

              //console.log(startYear);
              //console.log(endYear);

              //console.log(this);
              //console.log(this.start);
              //console.log(index);

              //console.log('选中年：'+year);
              //console.log('选中月：'+month);
              //console.log('去程年：'+startYear);
              //console.log('去程月：'+startMonth);
              if (this.start.index === index) {
                  // 取消选择去程时间
                  //this.reset();
                  if(this.start.html && !this.rt.html){
                      // 同日往返
                      this.setDayState(el, 'rt', index);
                      // 同日返程回调
                      this.options.rtCallback.call(this, date, this.getSelectNumberOfDays(this.start.date, date));
                  }else if(this.start.html && this.rt.html){
                      this.reset();
                      // 选择去程时间
                      this.setDayState(el, 'start', index);
                      // 去程回调
                      this.options.startCallback.call(this, date);
                  }
              }else if((year == startYear) && (month == startMonth) && (index < startIndex)) {
                    this.reset();
                    // 选择去程时间
                    this.setDayState(el, 'start', index);
                    // 去程回调
                    this.options.startCallback.call(this, date);
              }else if( (month<startMonth)&&(year==startYear) || (month!=startMonth)&&(year<startYear) ){
                  this.reset();
                  // 选择去程时间
                  this.setDayState(el, 'start', index);
                  // 去程回调
                  this.options.startCallback.call(this, date);
              }else if (!this.start.html && !this.rt.html ) {
                  // 选择去程时间
                  this.setDayState(el, 'start', index);
                  // 去程回调
                  this.options.startCallback.call(this, date);
              }else if (this.start.html && this.rt.html ) {
                  this.reset();
                  // 选择去程时间
                  this.setDayState(el, 'start', index);
                  // 去程回调
                  this.options.startCallback.call(this, date);
              }else{
                  // 选择返程时间
                  //var startMonth = this.start.date.getMonth() + 1;
                  // 当前日期所在的月份节点
                  var curMonthElem = Calendar.getParent(el);
                  // 当前选择的月份所有日期节点
                  var daysElems = curMonthElem.getElementsByTagName('li');
                  if (month != startMonth || (month == startMonth && year > startYear)) {
                      // 跨月选择/(跨年&跨月)
                      // 返程日期小于去程日期则不做任何操作, 因为是跨月选择，所以这里用月份判断
                      if (((month<startMonth)&&(year==startYear)) || (month!=startMonth)&&(year<startYear)) return false;
                      if (!this.isValidMaxDays(this.start.date, date)) {
                          this.options.maxCallback.call(this, this.start.date, date);
                          return false;
                      }
                      // 第一个月份节点
                      var startMonthElem = Calendar.getParent(this.start.el);
                      var startDaysElems = startMonthElem.getElementsByTagName('li');
                      // 设置返程样式
                      this.setDayState(el, 'end', index);
                      // 找出第一个月选择的日期节点
                      this.findSelectDayElems(startDaysElems, this.start.index, startDaysElems.length - 1);
                      // 找出中间月份的的日期节点
                      var curTime = getCurTime();
                      var monthCount;
                      if(year != this.endDate.getFullYear()){
                          monthCount = month - startMonth;
                      }else{
                          monthCount = month - startMonth + 12;
                      }
                      var monthsElems = this.el.querySelectorAll('.calendar-days');
                      //console.log(monthCount);
                      //console.log(monthsElems);

                      if(year != this.endDate.getFullYear() || startYear == this.startDate.getFullYear()){
                          for (var i = 1; i < monthCount; i++) {
                              var elems = monthsElems[startMonth - curTime.month + i].getElementsByTagName('li');
                              this.findSelectDayElems(elems, 0, elems.length - 1);
                          }
                      }else{
                          for (var i = 13; i < monthCount; i++) {
                              var num = parseInt(startMonth - curTime.month + i);
                              var elems = monthsElems[num].getElementsByTagName('li');
                              this.findSelectDayElems(elems, 0, elems.length - 1);
                          }
                      }






                      // 找出结束的节点
                      this.findSelectDayElems(daysElems, 0, index);
                      // 给选中的日期节点添加class
                      this.selectDayStyle({ type: 'add', className: 'active' });
                  } else {
                      // 同月选择
                      // 返程日期小于去程日期则不做任何操作
                      if(index < startIndex) return false;
                      if(!this.isValidMaxDays(this.start.date, date)) {
                          this.options.maxCallback.call(this, this.start.date, date);
                          return false;
                      }
                      // 设置返程样式
                      this.setDayState(el, 'end', index);
                      // 找出开始到结束选中的日期节点
                      this.findSelectDayElems(daysElems, startIndex, index);
                      // 给选中的日期节点添加class
                      this.selectDayStyle({ type: 'add', className: 'active' });
                  }
                  // 返程回调
                  this.options.endCallback.call(this, date, this.getSelectNumberOfDays(this.start.date, date));
              }
            break;
          case 2:
              // 已选择出发，则重置状态
              if (this.setOut.html) {
                  this.reset();
              }
              var index = +el.getAttribute('data-index');
              var date = new Date(dateStr);
              var month = date.getMonth() + 1;
              //console.log(this);

              this.setDayState(el, 'setOut', index);
              this.options.setOutCallback.call(this, date);

            break;
      }
    }

    // 是否有超过最大天数

  }, {
    key: 'isValidMaxDays',
    value: function isValidMaxDays(startDate, endDate) {
      if (typeof this.options.maxDays === 'boolean') return true;
      return this.getSelectNumberOfDays(startDate, endDate) < this.options.maxDays;
    }

    // 获取选择的天数

  }, {
    key: 'getSelectNumberOfDays',
    value: function getSelectNumberOfDays(startDate, endDate) {
      var startTime = getCurTime(startDate);
      var startMonth = startTime.month;
      var startDay = startTime.day;
      var endTime = getCurTime(endDate);
      var endMonth = endTime.month;
      var endDay = endTime.day;
      return startMonth === endMonth ? endDay - startDay : this.data[startMonth - 1].days - startDay + endDay;
    }
  }, {
    key: 'selectDate',
    value: function selectDate(startDateStr, endDateStr) {
      //console.log(startDateStr, endDateStr);
      if(endDateStr == undefined || endDateStr == null || endDateStr == ''){
          if (this.setOut.html) {
              this.reset();
          }
          var firstMonth = this.startDate.getMonth() + 1;
          var monthsElems = this.el.querySelectorAll('.calendar-days');
          // 出发时间
          var startDate = new Date(startDateStr);
          // console.log(this);
          // console.log(startDateStr);
          // console.log(startDate);

          var startYear = startDate.getFullYear();
          var startMonth = startDate.getMonth() + 1;
          var startDay = startDate.getDate();

          var startIndex = '';
          var startDaysElems = '';
          // console.log(startYear);
          // console.log(this.startDate.getFullYear());
          if(startYear == this.startDate.getFullYear()){
              startIndex = startDay + this.years[0].months[startMonth - 1].preDayCount - 1;
              startDaysElems = monthsElems[startMonth - firstMonth].getElementsByTagName('li');
          }else{
              startIndex = startDay + this.years[1].months[startMonth - 1].preDayCount - 1;
              startDaysElems = monthsElems[startMonth - firstMonth + 12].getElementsByTagName('li');
          }


          var startElem = startDaysElems[startIndex];

          // console.log(startDaysElems);
          // console.log(startIndex);
          // console.log(monthsElems);
          // console.log(startElem);

          this.setDayState(startElem, 'setOut', startIndex);
      }else{
          if(startDateStr != endDateStr){
              if (this.start.html && this.end.html) {
                  this.reset();
              }
          }else{
              if (this.start.html && this.rt.html) {
                  this.reset();
              }
          }
          var firstMonth = this.startDate.getMonth() + 1;
          var monthsElems = this.el.querySelectorAll('.calendar-days');
          // 去程时间
          var startDate = new Date(startDateStr);
          var startYear = startDate.getFullYear();
          var startMonth = startDate.getMonth() + 1;
          var startDay = startDate.getDate();
          var startIndex = '';
          var startDaysElems = '';
          if(startYear == this.startDate.getFullYear()){
              startIndex = startDay + this.years[0].months[startMonth - 1].preDayCount - 1;
              startDaysElems = monthsElems[startMonth - firstMonth].getElementsByTagName('li');
          }else{
              startIndex = startDay + this.years[1].months[startMonth - 1].preDayCount - 1;
              startDaysElems = monthsElems[startMonth - firstMonth + 12].getElementsByTagName('li');
          }

          // 返程时间
          var endDate = new Date(endDateStr);
          var endYear = endDate.getFullYear();
          var endMonth = endDate.getMonth() + 1;
          var endDay = endDate.getDate();
          var endIndex = '';
          if(endYear != this.endDate.getFullYear()){
              endIndex = endDay + this.years[0].months[endMonth - 1].preDayCount - 1;
          }else{
              endIndex = endDay + this.years[1].months[endMonth - 1].preDayCount - 1;
          }

          var startElem = startDaysElems[startIndex];
          var endElem = null;
          // 跨月
          if (startMonth !== endMonth || ( startMonth == endMonth && startYear < endYear ) ) {
              var endDaysElems;
              var monthCount;
              //console.log(monthsElems);
              if(endYear != this.endDate.getFullYear()){
                  endDaysElems = monthsElems[endMonth - firstMonth].getElementsByTagName('li');
                  monthCount = endMonth - startMonth;
              }else{
                  endDaysElems = monthsElems[endMonth - firstMonth + 12].getElementsByTagName('li');
                  monthCount = endMonth - startMonth + 12;
              }
              endElem = endDaysElems[endIndex];
              //console.log(endDaysElems);
              //console.log(endIndex);
              // 当前去程的月期
              this.findSelectDayElems(startDaysElems, startIndex, startDaysElems.length - 1);
              //console.log(endYear != this.endDate.getFullYear());
              if(endYear != this.endDate.getFullYear() || startYear != endYear){
                  for (var i = 1; i < monthCount; i++) {
                      var elems = monthsElems[startMonth - firstMonth + i].getElementsByTagName('li');
                      this.findSelectDayElems(elems, 0, elems.length - 1);
                  }
              }else{
                  for (var i = 13; i < monthCount; i++) {
                      var num = parseInt(startMonth - firstMonth + i);
                      var elems = monthsElems[num].getElementsByTagName('li');
                      this.findSelectDayElems(elems, 0, elems.length - 1);
                  }
              }
              // 当前返程的月期
              if(endYear != this.endDate.getFullYear()){
                  this.findSelectDayElems(endDaysElems, 0, endIndex);
              }else{
                  this.findSelectDayElems(endDaysElems, 0, endIndex);
              }
          } else {
                  endElem = startDaysElems[endIndex];
              this.findSelectDayElems(startDaysElems, startIndex, endIndex);
          }

          this.selectDayStyle({ type: 'add', className: 'active' });

          if(startDateStr != endDateStr){
              this.setDayState(startElem, 'start', startIndex);
              this.setDayState(endElem, 'end', endIndex);
          }else{
              this.setDayState(startElem, 'start', startIndex);
              this.setDayState(endElem, 'rt', endIndex);
          }
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
        //console.log(this);
      if(this.travelType == 1){
          this.start.el.innerHTML = this.start.html;
          this.end.html && (this.end.el.innerHTML = this.end.html);
          this.start = {};
          this.end = {};
          this.rt = {};
          this.selectDayStyle({ type: 'remove', className: 'active' });
          this.selectDayElems = [];
      }else{
          this.setOut.el.innerHTML = this.setOut.html;
          this.setOut = {};
          this.selectDayStyle({ type: 'remove', className: 'active' });
          this.selectDayElems = [];
      }
    }
  }, {
    key: 'findSelectDayElems',
    value: function findSelectDayElems(daysElems, startIndex, endIndex) {
      var _this3 = this;

      Calendar.forEach(daysElems, function (elem, elemIndex) {
        if (elemIndex > endIndex) return false;
        if (elemIndex >= startIndex && elemIndex <= endIndex) {
          _this3.selectDayElems.push(elem);
        }
        return true;
      });
    }

    // 给选中的日期添加class

  }, {
    key: 'selectDayStyle',
    value: function selectDayStyle(state) {
      Calendar.forEach(this.selectDayElems, function (elem, elemIndex, elemLength) {
        if (elemIndex !== 0 && elemIndex !== elemLength - 1) {
          elem.classList[state.type](state.className);
        }
        return true;
      });
    }

    // 设置去程和返程显示状态

  }, {
    key: 'setDayState',
    value: function setDayState(el, type, index) {
        //console.log(type);
        //console.log(this);
        //console.log(el.getAttribute('data-date'));
        var startYear = this.startDate.getFullYear();
        var endYear = this.endDate.getFullYear();
        var date = new Date(el.getAttribute('data-date'));
        var day = date.getDate();
        this[type] = { html: el.innerHTML, date: date, index: index, el: el };
        el.innerHTML = daySelect(day, type, this.props[type + 'Text']);
      }
  }, {
    key: 'dayType',
    value: function dayType(months,year, month, day) {
      var type = [];
      this.isHoliday(months,month, day) && type.push('holiday');
      this.isFest(months,month, day) && type.push('fest');
      this.isWeekend(year, month, day) && type.push('weekend');
      this.isWorkDay(months,month, day) && type.push('workday');
      return type.join(' ');
    }
  }, {
    key: 'monthType',
    value: function monthType(name, month) {
      var date = this[name + 'Date'];
      return date.getMonth() + 1 === month;
    }

    // 是否休息日

  }, {
    key: 'isHoliday',
    value: function isHoliday(months,month, day) {
      return months[month - 1].holidays[day];
    }
    // 是否工作日

  }, {
    key: 'isWorkDay',
    value: function isWorkDay(months,month, day) {
      return months[month - 1].workdays[day];
    }
    // 是否节日

  }, {
    key: 'isFest',
    value: function isFest(months,month, day) {
      return months[month - 1].fest[day];
    }
    // 是否是周末

  }, {
    key: 'isWeekend',
    value: function isWeekend(year, month, day) {
      var curMonth = month - 1;
      var date = new Date(year, zeroPadding(curMonth), zeroPadding(day));
      var curDay = date.getDay();
      return curDay === 0 || curDay === 6;
    }
    // 是否是当前月

  }, {
    key: 'isCurMonth',
    value: function isCurMonth(_year, _month) {
      var _getCurTime = getCurTime(),
          year = _getCurTime.year,
          month = _getCurTime.month;

      return _year === year && _month === month;
    }
    // 是否是今天

  }, {
    key: 'isToday',
    value: function isToday(_year, _month, _day) {
      var _getCurTime2 = getCurTime(),
          year = _getCurTime2.year,
          month = _getCurTime2.month,
          day = _getCurTime2.day;

      return _year === year && _month === month && _day === day;
    }
  }], [{
    key: 'getParent',
    value: function getParent(el) {
      var parent = el.parentNode;
      if (parent && parent.nodeType !== 11) {
        return parent;
      }
      return false;
    }
  }, {
    key: 'forEach',
    value: function forEach(obj, callback) {
      var i = 0;
      var length = obj.length;
      for (i; i < length; i++) {
        if (!callback(obj[i], i, length)) break;
      }
    }
  }, {
    key: 'format',
    value: function format(date, tpl) {
      return format$1(date, tpl);
    }
  }]);
  return Calendar;
}();

return Calendar;

})));