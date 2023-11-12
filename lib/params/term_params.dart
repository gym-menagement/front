import 'package:json_annotation/json_annotation.dart';

part 'term_params.g.dart';

@JsonSerializable()
class TermParams {
  
  final int? id;
  final int? gym;
  final int? daytype;
  final String? name;
  final int? term;
  final String? date;

  const TermParams({
    
    this.id,
    this.gym,
    this.daytype,
    this.name,
    this.term,
    this.date,
  });

  factory TermParams.fromJson(Map<String, dynamic> json) =>
      _$TermParamsFromJson(json);

  Map<String, dynamic> toJson() => _$TermParamsToJson(this);
}
