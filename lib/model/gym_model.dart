import 'package:json_annotation/json_annotation.dart';

part 'gym_model.g.dart';

@JsonSerializable()
class GymModel {
  
  final int id;
  final String name;
  final String date;

  GymModel({
    
    required this.id,
    required this.name,
    required this.date,
  });

  factory GymModel.fromJson(Map<String, dynamic> json) =>
      _$GymModelFromJson(json);
}
