import 'package:json_annotation/json_annotation.dart';

part 'daytype_model.g.dart';

@JsonSerializable()
class DaytypeModel {
  
  final int id;
  final int gym;
  final String name;
  final String date;

  DaytypeModel({
    
    required this.id,
    required this.gym,
    required this.name,
    required this.date,
  });

  factory DaytypeModel.fromJson(Map<String, dynamic> json) =>
      _$DaytypeModelFromJson(json);
}
