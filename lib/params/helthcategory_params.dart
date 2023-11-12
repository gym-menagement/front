import 'package:json_annotation/json_annotation.dart';

part 'helthcategory_params.g.dart';

@JsonSerializable()
class HelthcategoryParams {
  
  final int? id;
  final int? gym;
  final String? name;
  final String? date;

  const HelthcategoryParams({
    
    this.id,
    this.gym,
    this.name,
    this.date,
  });

  factory HelthcategoryParams.fromJson(Map<String, dynamic> json) =>
      _$HelthcategoryParamsFromJson(json);

  Map<String, dynamic> toJson() => _$HelthcategoryParamsToJson(this);
}
