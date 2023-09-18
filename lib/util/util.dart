import 'package:intl/intl.dart';

numberUnit(data) {
  return NumberFormat('###,###,###,###').format(data).replaceAll(' ', '');
}

discountAmount(cost, discountPer) {
  return cost * (100 - discountPer) / 100;
}
