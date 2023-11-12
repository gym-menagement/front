// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'term_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TermParams _$TermParamsFromJson(Map<String, dynamic> json) => TermParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      daytype: json['daytype'] as int?,
      name: json['name'] as String?,
      term: json['term'] as int?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$TermParamsToJson(TermParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'daytype': instance.daytype,
      'name': instance.name,
      'term': instance.term,
      'date': instance.date,
    };
