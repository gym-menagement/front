// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'term_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TermModel _$TermModelFromJson(Map<String, dynamic> json) => TermModel(
      id: json['id'] as int,
      gym: json['gym'] as int,
      daytype: json['daytype'] as int,
      name: json['name'] as String,
      term: json['term'] as int,
      date: json['date'] as String,
    );

Map<String, dynamic> _$TermModelToJson(TermModel instance) => <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'daytype': instance.daytype,
      'name': instance.name,
      'term': instance.term,
      'date': instance.date,
    };
