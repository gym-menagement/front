import 'package:json_annotation/json_annotation.dart';

part 'rocker_model.g.dart';

@JsonSerializable()
class RockerModel {
  
  final int id;
  final int group;
  final String name;
  final bool available;
  final String date;

  RockerModel({
    
    required this.id,
    required this.group,
    required this.name,
    required this.available,
    required this.date,
  });

  factory RockerModel.fromJson(Map<String, dynamic> json) =>
      _$RockerModelFromJson(json);
}
