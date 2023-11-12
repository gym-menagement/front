import 'package:json_annotation/json_annotation.dart';

part 'gym_params.g.dart';

@JsonSerializable()
class GymParams {
  
  final int? id;
  final String? name;
  final String? date;

  const GymParams({
    
    this.id,
    this.name,
    this.date,
  });

  factory GymParams.fromJson(Map<String, dynamic> json) =>
      _$GymParamsFromJson(json);

  Map<String, dynamic> toJson() => _$GymParamsToJson(this);
}
