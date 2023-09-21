import 'package:json_annotation/json_annotation.dart';

part 'role_params.g.dart';

@JsonSerializable()
class RoleParams {
  final int? gym;

  const RoleParams({
    this.gym,
  });

  factory RoleParams.fromJson(Map<String, dynamic> json) =>
      _$RoleParamsFromJson(json);

  Map<String, dynamic> toJson() => _$RoleParamsToJson(this);
}
