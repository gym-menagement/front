import 'package:json_annotation/json_annotation.dart';

part 'discount_params.g.dart';

@JsonSerializable()
class DiscountParams {
  
  final int? id;
  final String? name;
  final int? discount;
  final String? date;

  const DiscountParams({
    
    this.id,
    this.name,
    this.discount,
    this.date,
  });

  factory DiscountParams.fromJson(Map<String, dynamic> json) =>
      _$DiscountParamsFromJson(json);

  Map<String, dynamic> toJson() => _$DiscountParamsToJson(this);
}
