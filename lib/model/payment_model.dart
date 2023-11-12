import 'package:json_annotation/json_annotation.dart';

part 'payment_model.g.dart';

@JsonSerializable()
class PaymentModel {
  
  final int id;
  final int gym;
  final int order;
  final int membership;
  final int cost;
  final String date;

  PaymentModel({
    
    required this.id,
    required this.gym,
    required this.order,
    required this.membership,
    required this.cost,
    required this.date,
  });

  factory PaymentModel.fromJson(Map<String, dynamic> json) =>
      _$PaymentModelFromJson(json);
}
