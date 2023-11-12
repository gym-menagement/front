// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rocker_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RockerModel _$RockerModelFromJson(Map<String, dynamic> json) => RockerModel(
      id: json['id'] as int,
      group: json['group'] as int,
      name: json['name'] as String,
      available: json['available'] as bool,
      date: json['date'] as String,
    );

Map<String, dynamic> _$RockerModelToJson(RockerModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'group': instance.group,
      'name': instance.name,
      'available': instance.available,
      'date': instance.date,
    };
