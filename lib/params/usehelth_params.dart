import 'package:json_annotation/json_annotation.dart';

part 'usehelth_params.g.dart';

@JsonSerializable()
class UsehelthParams {
  
  final int? id;
  final int? order;
  final int? helth;
  final int? user;
  final int? rocker;
  final int? term;
  final int? discount;
  final String? startday;
  final String? endday;
  final String? date;

  const UsehelthParams({
    
    this.id,
    this.order,
    this.helth,
    this.user,
    this.rocker,
    this.term,
    this.discount,
    this.startday,
    this.endday,
    this.date,
  });

  factory UsehelthParams.fromJson(Map<String, dynamic> json) =>
      _$UsehelthParamsFromJson(json);

  Map<String, dynamic> toJson() => _$UsehelthParamsToJson(this);
}
