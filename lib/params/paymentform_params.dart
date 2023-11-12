import 'package:json_annotation/json_annotation.dart';

part 'paymentform_params.g.dart';

@JsonSerializable()
class PaymentformParams {
  
  final int? id;
  final int? gym;
  final int? payment;
  final int? type;
  final int? cost;
  final String? date;

  const PaymentformParams({
    
    this.id,
    this.gym,
    this.payment,
    this.type,
    this.cost,
    this.date,
  });

  factory PaymentformParams.fromJson(Map<String, dynamic> json) =>
      _$PaymentformParamsFromJson(json);

  Map<String, dynamic> toJson() => _$PaymentformParamsToJson(this);
}
