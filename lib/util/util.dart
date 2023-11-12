import 'package:intl/intl.dart';

numberUnit(data) {
  return NumberFormat('###,###,###,###').format(data).replaceAll(' ', '');
}

discountAmount(cost, discountPer) {
  return cost * (100 - discountPer) / 100;
}

yearMonthDay(date) {
  DateTime dt = DateTime.parse(date);

  return DateFormat('yyyy.MM.dd').format(dt);
}

phonenumberUnit(data) {
  return data.replaceAllMapped(
      RegExp(r'(\d{3})(\d{3,4})(\d{4})'), (m) => '${m[1]}-${m[2]}-${m[3]}');
}
