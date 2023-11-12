import 'package:json_annotation/json_annotation.dart';

part 'rocker_params.g.dart';

@JsonSerializable()
class RockerParams {
  
  final int? id;
  final int? group;
  final String? name;
  final bool? available;
  final String? date;

  const RockerParams({
    
    this.id,
    this.group,
    this.name,
    this.available,
    this.date,
  });

  factory RockerParams.fromJson(Map<String, dynamic> json) =>
      _$RockerParamsFromJson(json);

  Map<String, dynamic> toJson() => _$RockerParamsToJson(this);
}
