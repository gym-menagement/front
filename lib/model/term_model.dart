import 'package:json_annotation/json_annotation.dart';

part 'term_model.g.dart';

@JsonSerializable()
class TermModel {
  
  final int id;
  final int gym;
  final int daytype;
  final String name;
  final int term;
  final String date;

  TermModel({
    
    required this.id,
    required this.gym,
    required this.daytype,
    required this.name,
    required this.term,
    required this.date,
  });

  factory TermModel.fromJson(Map<String, dynamic> json) =>
      _$TermModelFromJson(json);
}
