import 'package:json_annotation/json_annotation.dart';

part 'helth_params.g.dart';

@JsonSerializable()
class HelthParams {
  
  final int? id;
  final int? category;
  final int? term;
  final String? name;
  final int? count;
  final int? cost;
  final int? discount;
  final int? costdiscount;
  final String? content;
  final String? date;

  const HelthParams({
    
    this.id,
    this.category,
    this.term,
    this.name,
    this.count,
    this.cost,
    this.discount,
    this.costdiscount,
    this.content,
    this.date,
  });

  factory HelthParams.fromJson(Map<String, dynamic> json) =>
      _$HelthParamsFromJson(json);

  Map<String, dynamic> toJson() => _$HelthParamsToJson(this);
}
