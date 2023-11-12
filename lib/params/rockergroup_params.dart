import 'package:json_annotation/json_annotation.dart';

part 'rockergroup_params.g.dart';

@JsonSerializable()
class RockergroupParams {
  
  final int? id;
  final int? gym;
  final String? name;
  final String? date;

  const RockergroupParams({
    
    this.id,
    this.gym,
    this.name,
    this.date,
  });

  factory RockergroupParams.fromJson(Map<String, dynamic> json) =>
      _$RockergroupParamsFromJson(json);

  Map<String, dynamic> toJson() => _$RockergroupParamsToJson(this);
}
