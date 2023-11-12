// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'daytype_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DaytypeModel _$DaytypeModelFromJson(Map<String, dynamic> json) => DaytypeModel(
      id: json['id'] as int,
      gym: json['gym'] as int,
      name: json['name'] as String,
      date: json['date'] as String,
    );

Map<String, dynamic> _$DaytypeModelToJson(DaytypeModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'name': instance.name,
      'date': instance.date,
    };
