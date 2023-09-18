import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';
import 'package:intl/intl.dart';
import 'package:table_calendar/table_calendar.dart';

class CalendarPick extends StatefulWidget {
  const CalendarPick({super.key});

  @override
  State<CalendarPick> createState() => CalendarPickState();
}

class CalendarPickState extends State<CalendarPick> {
  DateTime _focusedDay = DateTime.now();
  // DateTime fistDayOfMonth = DateTime(today.year, today.month, 1); // 1st
  // DateTime lastDayOfMonth = DateTime(today.year, today.month + 1, 0);
  DateTime? _selectedDay;
  DateTime? _rangeStart;
  DateTime? _rangeEnd;

  @override
  void initState() {
    super.initState();
    _selectedDay = _focusedDay;
  }

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    if (!isSameDay(_selectedDay, selectedDay)) {
      setState(() {
        _selectedDay = selectedDay;
        _focusedDay = focusedDay;
      });
    }
  }

  void _onRangeSelected(DateTime? start, DateTime? end, DateTime focusedDay) {
    setState(() {
      _selectedDay = null;
      _focusedDay = focusedDay;
      _rangeStart = start;
      _rangeEnd = end;
      print("start day : $_rangeStart");
      print("selected day : $_selectedDay");
      print("focused day : $_focusedDay");
      print("end day : $_rangeEnd");
    });
  }

  @override
  Widget build(BuildContext context) {
    return TableCalendar(
      rowHeight: 44,
      headerStyle: HeaderStyle(
        formatButtonVisible: false,
        titleCentered: true,
        titleTextFormatter: (date, locale) =>
            '${DateFormat.y(locale).format(date)}.${DateFormat.M(locale).format(date).toString().padLeft(2, '0')}',
        titleTextStyle: const TextStyle(
          color: Color(0xFF333333),
          fontSize: 20,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w500,
          height: 0,
        ),
        headerPadding: const EdgeInsets.only(bottom: 12),
        leftChevronPadding: const EdgeInsets.all(0),
        rightChevronPadding: const EdgeInsets.all(0),
        leftChevronIcon: const Icon(
          CupertinoIcons.chevron_left,
          color: GREY_500_COLOR,
          size: 16,
        ),
        rightChevronIcon: const Icon(
          CupertinoIcons.chevron_right,
          color: GREY_500_COLOR,
          size: 16,
        ),
      ),
      calendarStyle: const CalendarStyle(
        todayTextStyle: TextStyle(
          color: GREY_900_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        todayDecoration: BoxDecoration(),
        selectedTextStyle: TextStyle(
          color: WHITE_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        selectedDecoration: BoxDecoration(
          color: PRIMARY_COLOR,
          shape: BoxShape.circle,
        ),
        rangeHighlightColor: Color(0xFFEFF3FF),
        rangeStartDecoration: BoxDecoration(
          color: PRIMARY_IT_01_COLOR,
          shape: BoxShape.circle,
        ),
        rangeStartTextStyle: TextStyle(
          color: WHITE_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        rangeEndTextStyle: TextStyle(
          color: WHITE_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        withinRangeTextStyle: TextStyle(
          color: GREY_600_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        rangeEndDecoration: BoxDecoration(
          color: PRIMARY_COLOR,
          shape: BoxShape.circle,
        ),
        outsideTextStyle: TextStyle(
          color: GREY_300_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        defaultTextStyle: TextStyle(
          color: GREY_600_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        disabledTextStyle: TextStyle(
          color: GREY_300_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        weekendTextStyle: TextStyle(
          color: GREY_600_COLOR,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
        cellPadding: EdgeInsets.all(0.0),
        cellMargin: EdgeInsets.all(0.0),
        tableBorder: TableBorder(
          horizontalInside: BorderSide(width: 4, color: WHITE_COLOR),
        ),
      ),
      calendarBuilders: CalendarBuilders(
        dowBuilder: (context, day) {
          switch (day.weekday) {
            case 1:
              return const WeekText(name: 'Mo');
            case 2:
              return const WeekText(name: 'Tu');
            case 3:
              return const WeekText(name: 'We');
            case 4:
              return const WeekText(name: 'Th');
            case 5:
              return const WeekText(name: 'Fi');
            case 6:
              return const WeekText(name: 'Sa');
            case 7:
              return const WeekText(name: 'Su');
          }
          return null;
        },
      ),
      availableGestures: AvailableGestures.all,
      selectedDayPredicate: (day) => isSameDay(_focusedDay, day),
      startingDayOfWeek: StartingDayOfWeek.monday,
      daysOfWeekHeight: 40,
      rangeStartDay: _rangeStart,
      onRangeSelected: _onRangeSelected,
      rangeEndDay: _rangeEnd,
      rangeSelectionMode: RangeSelectionMode.toggledOn,
      firstDay: DateTime.utc(2023, 8, 28),
      lastDay: DateTime.utc(2023, 10, 1),
      focusedDay: _focusedDay,
      onDaySelected: _onDaySelected,
      // onPageChanged: (focusedDay) {
      //   _focusedDay = focusedDay;
      // },
    );
  }
}

class WeekText extends StatelessWidget {
  final String name;

  const WeekText({
    super.key,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        name,
        textAlign: TextAlign.center,
        style: const TextStyle(
          color: GREY_600_COLOR,
          fontSize: 16,
          fontFamily: 'Outfit',
          fontWeight: FontWeight.w400,
          height: 0,
        ),
      ),
    );
  }
}
