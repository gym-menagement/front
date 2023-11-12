import 'package:json_annotation/json_annotation.dart';

part 'order_model.g.dart';

@JsonSerializable()
class OrderModel {
  
  final int id;
  final int membership;
  final String date;

  OrderModel({
    
    required this.id,
    required this.membership,
    required this.date,
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) =>
      _$OrderModelFromJson(json);
}
