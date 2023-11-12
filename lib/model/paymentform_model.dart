import 'package:json_annotation/json_annotation.dart';

part 'paymentform_model.g.dart';

@JsonSerializable()
class PaymentformModel {
  
  final int id;
  final int gym;
  final int payment;
  final int type;
  final int cost;
  final String date;

  PaymentformModel({
    
    required this.id,
    required this.gym,
    required this.payment,
    required this.type,
    required this.cost,
    required this.date,
  });

  factory PaymentformModel.fromJson(Map<String, dynamic> json) =>
      _$PaymentformModelFromJson(json);
}
