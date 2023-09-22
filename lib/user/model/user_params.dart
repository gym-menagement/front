import 'package:json_annotation/json_annotation.dart';

part 'user_params.g.dart';

@JsonSerializable()
class UserParams {
  final int? gym;
  final String? name;

  const UserParams({
    this.gym,
    this.name,
  });

  factory UserParams.fromJson(Map<String, dynamic> json) =>
      _$UserParamsFromJson(json);

  Map<String, dynamic> toJson() => _$UserParamsToJson(this);
}
