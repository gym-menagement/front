import 'package:json_annotation/json_annotation.dart';

part 'usehelth_model.g.dart';

@JsonSerializable()
class UsehelthModel {
  
  final int id;
  final int order;
  final int helth;
  final int user;
  final int rocker;
  final int term;
  final int discount;
  final String startday;
  final String endday;
  final String date;

  UsehelthModel({
    
    required this.id,
    required this.order,
    required this.helth,
    required this.user,
    required this.rocker,
    required this.term,
    required this.discount,
    required this.startday,
    required this.endday,
    required this.date,
  });

  factory UsehelthModel.fromJson(Map<String, dynamic> json) =>
      _$UsehelthModelFromJson(json);
}
