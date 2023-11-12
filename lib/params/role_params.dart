import 'package:json_annotation/json_annotation.dart';

part 'role_params.g.dart';

@JsonSerializable()
class RoleParams {
  
  final int? id;
  final int? gym;
  final int? role;
  final String? name;
  final String? date;

  const RoleParams({
    
    this.id,
    this.gym,
    this.role,
    this.name,
    this.date,
  });

  factory RoleParams.fromJson(Map<String, dynamic> json) =>
      _$RoleParamsFromJson(json);

  Map<String, dynamic> toJson() => _$RoleParamsToJson(this);
}
