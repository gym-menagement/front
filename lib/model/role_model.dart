import 'package:json_annotation/json_annotation.dart';

part 'role_model.g.dart';

@JsonSerializable()
class RoleModel {
  
  final int id;
  final int gym;
  final int role;
  final String name;
  final String date;

  RoleModel({
    
    required this.id,
    required this.gym,
    required this.role,
    required this.name,
    required this.date,
  });

  factory RoleModel.fromJson(Map<String, dynamic> json) =>
      _$RoleModelFromJson(json);
}
