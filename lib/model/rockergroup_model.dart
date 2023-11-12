import 'package:json_annotation/json_annotation.dart';

part 'rockergroup_model.g.dart';

@JsonSerializable()
class RockergroupModel {
  
  final int id;
  final int gym;
  final String name;
  final String date;

  RockergroupModel({
    
    required this.id,
    required this.gym,
    required this.name,
    required this.date,
  });

  factory RockergroupModel.fromJson(Map<String, dynamic> json) =>
      _$RockergroupModelFromJson(json);
}
