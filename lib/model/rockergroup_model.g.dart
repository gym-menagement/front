// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rockergroup_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RockergroupModel _$RockergroupModelFromJson(Map<String, dynamic> json) =>
    RockergroupModel(
      id: json['id'] as int,
      gym: json['gym'] as int,
      name: json['name'] as String,
      date: json['date'] as String,
    );

Map<String, dynamic> _$RockergroupModelToJson(RockergroupModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'name': instance.name,
      'date': instance.date,
    };
