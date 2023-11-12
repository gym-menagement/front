import 'package:json_annotation/json_annotation.dart';

part 'stop_model.g.dart';

@JsonSerializable()
class StopModel {
  
  final int id;
  final int usehelth;
  final String startday;
  final String endday;
  final int count;
  final String date;

  StopModel({
    
    required this.id,
    required this.usehelth,
    required this.startday,
    required this.endday,
    required this.count,
    required this.date,
  });

  factory StopModel.fromJson(Map<String, dynamic> json) =>
      _$StopModelFromJson(json);
}
