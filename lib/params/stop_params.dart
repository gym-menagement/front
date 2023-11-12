import 'package:json_annotation/json_annotation.dart';

part 'stop_params.g.dart';

@JsonSerializable()
class StopParams {
  
  final int? id;
  final int? usehelth;
  final String? startday;
  final String? endday;
  final int? count;
  final String? date;

  const StopParams({
    
    this.id,
    this.usehelth,
    this.startday,
    this.endday,
    this.count,
    this.date,
  });

  factory StopParams.fromJson(Map<String, dynamic> json) =>
      _$StopParamsFromJson(json);

  Map<String, dynamic> toJson() => _$StopParamsToJson(this);
}
