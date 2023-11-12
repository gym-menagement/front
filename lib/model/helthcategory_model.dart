import 'package:json_annotation/json_annotation.dart';

part 'helthcategory_model.g.dart';

@JsonSerializable()
class HelthcategoryModel {
  
  final int id;
  final int gym;
  final String name;
  final String date;

  HelthcategoryModel({
    
    required this.id,
    required this.gym,
    required this.name,
    required this.date,
  });

  factory HelthcategoryModel.fromJson(Map<String, dynamic> json) =>
      _$HelthcategoryModelFromJson(json);
}
