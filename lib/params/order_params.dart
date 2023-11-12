import 'package:json_annotation/json_annotation.dart';

part 'order_params.g.dart';

@JsonSerializable()
class OrderParams {
  
  final int? id;
  final int? membership;
  final String? date;

  const OrderParams({
    
    this.id,
    this.membership,
    this.date,
  });

  factory OrderParams.fromJson(Map<String, dynamic> json) =>
      _$OrderParamsFromJson(json);

  Map<String, dynamic> toJson() => _$OrderParamsToJson(this);
}
