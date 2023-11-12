import 'package:json_annotation/json_annotation.dart';

part 'paymenttype_params.g.dart';

@JsonSerializable()
class PaymenttypeParams {
  
  final int? id;
  final int? gym;
  final String? name;
  final String? date;

  const PaymenttypeParams({
    
    this.id,
    this.gym,
    this.name,
    this.date,
  });

  factory PaymenttypeParams.fromJson(Map<String, dynamic> json) =>
      _$PaymenttypeParamsFromJson(json);

  Map<String, dynamic> toJson() => _$PaymenttypeParamsToJson(this);
}
