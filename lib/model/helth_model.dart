import 'package:json_annotation/json_annotation.dart';

part 'helth_model.g.dart';

@JsonSerializable()
class HelthModel {
  
  final int id;
  final int category;
  final int term;
  final String name;
  final int count;
  final int cost;
  final int discount;
  final int costdiscount;
  final String content;
  final String date;

  HelthModel({
    
    required this.id,
    required this.category,
    required this.term,
    required this.name,
    required this.count,
    required this.cost,
    required this.discount,
    required this.costdiscount,
    required this.content,
    required this.date,
  });

  factory HelthModel.fromJson(Map<String, dynamic> json) =>
      _$HelthModelFromJson(json);
}
