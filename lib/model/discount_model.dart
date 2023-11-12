import 'package:json_annotation/json_annotation.dart';

part 'discount_model.g.dart';

@JsonSerializable()
class DiscountModel {
  
  final int id;
  final String name;
  final int discount;
  final String date;

  DiscountModel({
    
    required this.id,
    required this.name,
    required this.discount,
    required this.date,
  });

  factory DiscountModel.fromJson(Map<String, dynamic> json) =>
      _$DiscountModelFromJson(json);
}
