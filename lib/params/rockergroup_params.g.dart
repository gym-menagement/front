// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rockergroup_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RockergroupParams _$RockergroupParamsFromJson(Map<String, dynamic> json) =>
    RockergroupParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      name: json['name'] as String?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$RockergroupParamsToJson(RockergroupParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'name': instance.name,
      'date': instance.date,
    };
