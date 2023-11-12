import 'package:json_annotation/json_annotation.dart';

part 'payment_params.g.dart';

@JsonSerializable()
class PaymentParams {
  
  final int? id;
  final int? gym;
  final int? order;
  final int? membership;
  final int? cost;
  final String? date;

  const PaymentParams({
    
    this.id,
    this.gym,
    this.order,
    this.membership,
    this.cost,
    this.date,
  });

  factory PaymentParams.fromJson(Map<String, dynamic> json) =>
      _$PaymentParamsFromJson(json);

  Map<String, dynamic> toJson() => _$PaymentParamsToJson(this);
}
