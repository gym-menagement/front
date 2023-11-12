import 'package:json_annotation/json_annotation.dart';

part 'paymenttype_model.g.dart';

@JsonSerializable()
class PaymenttypeModel {
  
  final int id;
  final int gym;
  final String name;
  final String date;

  PaymenttypeModel({
    
    required this.id,
    required this.gym,
    required this.name,
    required this.date,
  });

  factory PaymenttypeModel.fromJson(Map<String, dynamic> json) =>
      _$PaymenttypeModelFromJson(json);
}
