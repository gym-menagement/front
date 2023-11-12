import 'package:json_annotation/json_annotation.dart';

part 'daytype_params.g.dart';

@JsonSerializable()
class DaytypeParams {
  
  final int? id;
  final int? gym;
  final String? name;
  final String? date;

  const DaytypeParams({
    
    this.id,
    this.gym,
    this.name,
    this.date,
  });

  factory DaytypeParams.fromJson(Map<String, dynamic> json) =>
      _$DaytypeParamsFromJson(json);

  Map<String, dynamic> toJson() => _$DaytypeParamsToJson(this);
}
