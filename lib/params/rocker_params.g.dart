// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rocker_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RockerParams _$RockerParamsFromJson(Map<String, dynamic> json) => RockerParams(
      id: json['id'] as int?,
      group: json['group'] as int?,
      name: json['name'] as String?,
      available: json['available'] as bool?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$RockerParamsToJson(RockerParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'group': instance.group,
      'name': instance.name,
      'available': instance.available,
      'date': instance.date,
    };
